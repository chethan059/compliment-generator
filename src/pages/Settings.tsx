
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { exportData, importData } from "@/utils/storage";
import { useCompliments } from "@/context/ComplimentContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { Bell, Download, Upload, VolumeX, Vibrate } from "lucide-react";

const Settings = () => {
  const { notificationSettings, updateNotificationSettings, randomNotificationsEnabled, toggleRandomNotifications } = useCompliments();
  const [importText, setImportText] = useState("");
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    // Create a download link and trigger it
    const a = document.createElement("a");
    a.href = url;
    a.download = "compliments-data.json";
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Data exported",
      description: "Your compliments data has been exported.",
    });
  };
  
  const handleImport = () => {
    try {
      const success = importData(importText);
      if (success) {
        setImportText("");
        toast({
          title: "Data imported",
          description: "Your compliments data has been imported successfully.",
        });
        // Reload the page to reflect changes
        window.location.reload();
      } else {
        throw new Error("Import failed");
      }
    } catch (error) {
      toast({
        title: "Import failed",
        description: "There was an error importing your data. Please check the format.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout title="Settings" showBackButton>
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Configure how you want to receive your compliments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <Label htmlFor="random-notifications">Random Compliments</Label>
              </div>
              <Switch 
                id="random-notifications" 
                checked={randomNotificationsEnabled}
                onCheckedChange={toggleRandomNotifications}
              />
            </div>
            
            <div className="text-sm text-muted-foreground pl-7 -mt-2">
              Receive surprise compliments throughout the day
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Vibrate className="w-5 h-5 text-muted-foreground" />
                <Label htmlFor="vibration">Vibration</Label>
              </div>
              <Switch 
                id="vibration" 
                checked={notificationSettings.vibration}
                onCheckedChange={(checked) => 
                  updateNotificationSettings({...notificationSettings, vibration: checked})
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <VolumeX className="w-5 h-5 text-muted-foreground" />
                <Label htmlFor="silent">Silent Mode</Label>
              </div>
              <Switch 
                id="silent" 
                checked={notificationSettings.silent}
                onCheckedChange={(checked) => 
                  updateNotificationSettings({...notificationSettings, silent: checked})
                }
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>
              Import or export your compliment data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleExport} 
              variant="outline" 
              className="w-full sm:w-auto flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            
            <div className="space-y-2">
              <Label htmlFor="import-data">Import Data</Label>
              <textarea 
                id="import-data"
                placeholder="Paste your JSON data here"
                className="w-full h-32 p-2 border rounded-md"
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
              ></textarea>
              <Button 
                onClick={handleImport} 
                disabled={!importText} 
                variant="secondary"
                className="flex items-center"
              >
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {isMobile && (
          <Card>
            <CardHeader>
              <CardTitle>Mobile App</CardTitle>
              <CardDescription>
                Get the most out of your compliments on mobile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                This web app is optimized for mobile use. For the best experience:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Add to your home screen for app-like experience</li>
                <li>Allow notifications when prompted for timely compliments</li>
                <li>Keep the app running in the background for scheduled compliments</li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Settings;
