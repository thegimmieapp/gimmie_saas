
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TopProductsTable({ conversions, isLoading }) {
  const getTopProducts = () => {
    const productMap = new Map();
    conversions.forEach(conv => {
      conv.products?.forEach(prod => {
        if (productMap.has(prod.sku)) {
          const existing = productMap.get(prod.sku);
          existing.conversions += 1;
          existing.revenue += prod.price * prod.quantity;
          // Add time metrics
          if (conv.time_to_cart > 0) {
            existing.total_time_to_cart += conv.time_to_cart;
            existing.cart_events += 1;
          }
        } else {
          productMap.set(prod.sku, {
            ...prod,
            conversions: 1,
            revenue: prod.price * prod.quantity,
            total_time_to_cart: conv.time_to_cart || 0,
            cart_events: conv.time_to_cart > 0 ? 1 : 0
          });
        }
      });
    });
    
    // Calculate average times and sort by revenue
    return Array.from(productMap.values())
      .map(prod => ({
        ...prod,
        avg_time_to_cart: prod.cart_events > 0 ? prod.total_time_to_cart / prod.cart_events : 0
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  };

  const topProducts = getTopProducts();

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg h-full">
      <CardHeader>
        <CardTitle>Top Performing Products</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Conversions</TableHead>
              <TableHead>Avg Time to Cart</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : topProducts.length > 0 ? (
              topProducts.map(product => (
                <TableRow key={product.sku}>
                  <TableCell>
                    <div className="font-medium text-slate-900">{product.title}</div>
                    <div className="text-xs text-slate-500 font-mono">SKU: {product.sku}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.conversions}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-blue-600 font-medium">
                      {product.avg_time_to_cart > 0 
                        ? `${Math.round(product.avg_time_to_cart)}s` 
                        : "N/A"
                      }
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium text-emerald-600">
                    ${product.revenue.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-24 text-slate-500">
                  No product conversion data yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
