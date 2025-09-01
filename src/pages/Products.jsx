
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Product, Store } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { 
  Box,
  Download,
  Upload,
  RefreshCw,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  FileUp
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { UploadFile, ExtractDataFromUploadedFile } from "@/api/integrations";
import { useTutorial } from "../components/onboarding/TutorialProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const fileInputRef = useRef(null);

  const { startTutorial } = useTutorial();

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    // Start products tutorial
    if (!isLoading && products.length > 0) {
      const tutorialSteps = [
        {
          title: "Product Catalog Management 📦",
          description: "Control which products Gimmie AI can recommend as gifts. Toggle products on/off easily.",
          targetSelector: "[data-tutorial='product-actions']",
          position: "bottom"
        },
        {
          title: "Import Your Products",
          description: "Bulk import products from CSV or sync directly with Shopify to get your catalog ready quickly.",
          targetSelector: "[data-tutorial='import-sync']",
          position: "bottom"
        },
        {
          title: "Filter and Search",
          description: "Find specific products using search, status filters, and stock level filters.",
          targetSelector: "[data-tutorial='filters']",
          position: "bottom"
        },
        {
          title: "Enable for AI Recommendations",
          description: "Use these switches to control which products can be suggested as gifts. Out-of-stock items are automatically hidden.",
          targetSelector: "[data-tutorial='enable-toggle']",
          position: "left"
        }
      ];
      
      setTimeout(() => {
        startTutorial(tutorialSteps, "products-intro");
      }, 500);
    }
  }, [isLoading, products, startTutorial]);

  const loadInitialData = async () => {
    setIsLoading(true);
    const [productData, storeData] = await Promise.all([
        Product.list("-created_date", 100),
        Store.list()
    ]);
    setProducts(productData);
    setStores(storeData);
    setIsLoading(false);
  };

  const loadProducts = async () => {
    const productData = await Product.list("-created_date", 100);
    setProducts(productData);
  };

  const handleSync = async () => {
    setIsSyncing(true);
    // In a real app, this would trigger a backend job to fetch from Shopify API.
    // Here we just simulate it and reload.
    await new Promise(resolve => setTimeout(resolve, 2000));
    await loadProducts();
    setIsSyncing(false);
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
        alert("Please select a CSV or XLSX file.");
        return;
    }

    setIsImporting(true);
    try {
        const { file_url } = await UploadFile({ file });
        
        const productSchema = Product.schema();
        // Remove store_id and shopify_product_id from required for extraction, as they may not be in the file
        const extractionSchema = { ...productSchema, required: ["title"] };

        const extractionResult = await ExtractDataFromUploadedFile({
            file_url: file_url,
            json_schema: extractionSchema
        });

        if (extractionResult.status === 'error' || !extractionResult.output) {
            throw new Error(extractionResult.details || "Failed to extract data from file.");
        }
        
        const currentStore = stores[0];
        if (!currentStore) {
            throw new Error("No store configured. Cannot import products.");
        }

        // Add store_id and a unique shopify_product_id if missing
        const productsToCreate = extractionResult.output.map((prod, index) => ({
            ...prod,
            store_id: currentStore.id,
            shopify_product_id: prod.shopify_product_id || `imported-${Date.now()}-${index}-${currentStore.id}`, // Ensure unique ID
        }));
        
        await Product.bulkCreate(productsToCreate);
        alert(`${productsToCreate.length} products imported successfully!`);
        await loadProducts();

    } catch (error) {
        console.error("Import failed:", error);
        alert(`Import failed: ${error.message}`);
    } finally {
        setIsImporting(false);
        // Reset file input
        if(fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleToggleRecommendable = async (product) => {
    const updatedProducts = products.map(p => 
      p.id === product.id ? { ...p, is_recommendable: !p.is_recommendable } : p
    );
    setProducts(updatedProducts);
    await Product.update(product.id, { is_recommendable: !product.is_recommendable });
    // No full reload to keep the UI snappy
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const searchMatch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.vendor.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = statusFilter === 'all' || (statusFilter === 'recommendable' && p.is_recommendable) || (statusFilter === 'hidden' && !p.is_recommendable);
      const stockMatch = stockFilter === 'all' || (stockFilter === 'in_stock' && p.inventory_quantity > 0) || (stockFilter === 'out_of_stock' && p.inventory_quantity <= 0);
      return searchMatch && statusMatch && stockMatch;
    });
  }, [products, searchTerm, statusFilter, stockFilter]);

  const recommendableCount = products.filter(p => p.is_recommendable).length;

  return (
    <div className="p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
       <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileImport}
        className="hidden"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Product Catalog</h1>
            <p className="text-slate-600 text-lg">
              Manage which products are available for AI recommendations.
            </p>
          </div>
          <TooltipProvider>
            <div className="flex gap-3" data-tutorial="import-sync">
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="gap-2" onClick={handleImportClick} disabled={isImporting}>
                    {isImporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileUp className="w-4 h-4" />}
                    {isImporting ? "Importing..." : "Import from File"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bulk upload products from a CSV or XLSX file.</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" /> Export CSV
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download your current product catalog as a CSV file.</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button onClick={handleSync} disabled={isSyncing} className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 gap-2">
                    <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                    {isSyncing ? "Syncing..." : "Sync with Shopify"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Automatically update your catalog from your Shopify store.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-tutorial="product-actions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">Synced from your Shopify store</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recommendable Products</CardTitle>
              <CheckCircle className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recommendableCount}</div>
              <p className="text-xs text-muted-foreground">{((recommendableCount / products.length || 0) * 100).toFixed(0)}% of catalog</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.filter(p => p.inventory_quantity <= 0).length}</div>
              <p className="text-xs text-muted-foreground">Products automatically hidden from results</p>
            </CardContent>
          </Card>
        </div>

        {/* Product Table Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
          <CardHeader>
            <div className="flex flex-col md:flex-row items-center gap-4" data-tutorial="filters">
              <div className="flex-1 relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by title or vendor..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <div className="flex gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="recommendable">Recommendable</SelectItem>
                    <SelectItem value="hidden">Hidden</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={stockFilter} onValueChange={setStockFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by stock" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stock</SelectItem>
                    <SelectItem value="in_stock">In Stock</SelectItem>
                    <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]"></TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Inventory</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right" data-tutorial="enable-toggle">Enable for AI</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-10 w-10 rounded-md" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-6 w-12 rounded-full ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img src={product.image_url} alt={product.title} className="h-10 w-10 rounded-md object-cover" />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-slate-900">{product.title}</div>
                        <div className="text-xs text-slate-500">{product.vendor}</div>
                      </TableCell>
                      <TableCell>
                        {product.inventory_quantity > 0 ? (
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                            In Stock
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            Out of Stock
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{product.inventory_quantity} units</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.product_type}</TableCell>
                      <TableCell className="text-right">
                        <TooltipProvider>
                          <div className="flex items-center justify-end gap-2">
                            <span className={`text-sm ${product.is_recommendable ? 'text-emerald-600' : 'text-slate-500'}`}>
                              {product.is_recommendable ? 'Enabled' : 'Disabled'}
                            </span>
                            <Tooltip delayDuration={300}>
                              <TooltipTrigger asChild>
                                <div className="inline-block"> {/* Wrap Switch in a div to ensure it's a valid child for asChild */}
                                  <Switch
                                    checked={product.is_recommendable}
                                    onCheckedChange={() => handleToggleRecommendable(product)}
                                    aria-label="Toggle recommendable status"
                                  />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{product.is_recommendable ? 'Disable' : 'Enable'} this product for AI recommendations.</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <FileText className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                      <h3 className="font-semibold text-slate-700">No Products Found</h3>
                      <p className="text-sm text-slate-500">
                        Your search or filter criteria did not match any products.
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
