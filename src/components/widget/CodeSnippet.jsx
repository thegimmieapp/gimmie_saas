import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle, Code2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CodeSnippet({ config }) {
  const [copied, setCopied] = useState(false);

  const scriptTagCode = `<!-- Add this script tag to your theme.liquid file before </head> -->
<script 
  src="https://cdn.gimmie.ai/widget.js" 
  data-button-bg="${config.button_bg_color}"
  data-button-text="${config.button_text_color}"
  data-modal-bg="${config.modal_bg_color}"
  data-modal-text="${config.modal_text_color}"
  data-position="${config.position}"
  data-style="${config.button_style}"
  data-font="${config.font_family}"
  data-text="${config.custom_text}"
  data-animation="${config.animation_type}"
  defer>
</script>`;

  const appBlockCode = `<!-- Shopify 2.0 App Block Code -->
{% comment %} Add this to your theme's app blocks {% endcomment %}

<div id="gimmie-widget" 
     data-config='${JSON.stringify(config, null, 2)}'>
</div>

<script>
  if (window.GimmieWidget) {
    window.GimmieWidget.init({{ shop.permanent_domain }});
  }
</script>`;

  const webhookCode = `// Webhook Configuration
{
  "webhook": {
    "topic": "orders/create",
    "address": "https://api.gimmie.ai/shopify/webhooks/order-create",
    "format": "json"
  }
}

// Required Shopify API Scopes:
// - read_products
// - write_script_tags  
// - read_themes
// - read_orders`;

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="space-y-4">
      
      <div className="flex items-center gap-2 mb-4">
        <Code2 className="w-4 h-4 text-slate-600" />
        <h3 className="text-sm font-semibold text-slate-700">Integration Code</h3>
      </div>

      <Tabs defaultValue="script" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="script">Script Tag</TabsTrigger>
          <TabsTrigger value="block">App Block</TabsTrigger>
          <TabsTrigger value="webhook">Webhook</TabsTrigger>
        </TabsList>
        
        <TabsContent value="script" className="space-y-3">
          <div className="bg-slate-900 text-slate-100 rounded-lg p-4 relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(scriptTagCode)}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-100"
            >
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
            <pre className="text-xs overflow-x-auto pr-12">
              <code>{scriptTagCode}</code>
            </pre>
          </div>
          <p className="text-xs text-slate-600">
            This script tag method automatically injects the widget into your store with your custom styling.
          </p>
        </TabsContent>
        
        <TabsContent value="block" className="space-y-3">
          <div className="bg-slate-900 text-slate-100 rounded-lg p-4 relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(appBlockCode)}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-100"
            >
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
            <pre className="text-xs overflow-x-auto pr-12">
              <code>{appBlockCode}</code>
            </pre>
          </div>
          <p className="text-xs text-slate-600">
            For Shopify 2.0 themes, use this app block code for better integration with the theme editor.
          </p>
        </TabsContent>
        
        <TabsContent value="webhook" className="space-y-3">
          <div className="bg-slate-900 text-slate-100 rounded-lg p-4 relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(webhookCode)}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-100"
            >
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
            <pre className="text-xs overflow-x-auto pr-12">
              <code>{webhookCode}</code>
            </pre>
          </div>
          <p className="text-xs text-slate-600">
            Webhook configuration for tracking conversions and order data. This is handled automatically by the app.
          </p>
        </TabsContent>
      </Tabs>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-800">
          <strong>⚡ Pro Tip:</strong> The script tag method is the easiest way to get started. Our app will automatically handle the injection once you complete the Shopify OAuth flow.
        </p>
      </div>
    </div>
  );
}