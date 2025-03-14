
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  Upload, 
  Bell, 
  Volume2, 
  VolumeX, 
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { useCompliments } from "@/context/ComplimentContext";
import { exportData, importData } from "@/utils/storage";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { notificationSettings, updateNotificationSettings, refreshCompliments } = useCompliments();
  const { toast } = useToast();
  const [settings, setSettings] = useState(notificationSettings);

  const handleSettingChange = (key: keyof typeof settings, value: boolean) => {
    const updatedSettings = { ...settings, [key]: value };
    
    // If sound is turned on, silent should be turned off and vice versa
    if (key === "sound" && value === true) {
      updatedSettings.silent = false;
    } else if (key === "silent" && value === true) {
      updatedSettings.sound = false;
    }
    
    setSettings(updatedSettings);
    updateNotificationSettings(updatedSettings);
  };

  const handleExport = () => {
    const jsonData = exportData();
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `compliments-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Data exported",
      description: "Your compliments and settings have been downloaded."
    });
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const contents = e.target?.result as string;
        const success = importData(contents);
        
        if (success) {
          refreshCompliments();
          toast({
            title: "Data imported successfully",
            description: "Your compliments and settings have been restored."
          });
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        toast({
          title: "Import failed",
          description: "The file format is invalid or corrupted.",
          variant: "destructive"
        });
      }
      
      // Reset file input
      event.target.value = "";
    };
    
    reader.readAsText(file);
  };

  const resetApp = () => {
    if (confirm("Are you sure you want to reset the app? This will delete all your compliments and settings.")) {
      localStorage.clear();
      refreshCompliments();
      toast({
        title: "App reset complete",
        description: "All data has been cleared. The app will now reload."
      });
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  return (
    <Layout title="Settings" showBackButton>
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Configure how you receive compliment notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Bell className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="sound">Sound</Label>
                  <p className="text-sm text-muted-foreground">Play sound with notifications</p>
                </div>
              </div>
              <Switch 
                id="sound" 
                checked={settings.sound}
                onCheckedChange={(checked) => handleSettingChange("sound", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <RefreshCw className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="vibration">Vibration</Label>
                  <p className="text-sm text-muted-foreground">Vibrate when notifications arrive</p>
                </div>
              </div>
              <Switch 
                id="vibration" 
                checked={settings.vibration}
                onCheckedChange={(checked) => handleSettingChange("vibration", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <VolumeX className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="silent">Silent Mode</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications without sound</p>
                </div>
              </div>
              <Switch 
                id="silent" 
                checked={settings.silent}
                onCheckedChange={(checked) => handleSettingChange("silent", checked)}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Backup & Restore</CardTitle>
            <CardDescription>
              Export or import your compliments and settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                className="flex items-center" 
                onClick={handleExport}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              
              <div className="relative">
                <Button variant="outline" className="flex items-center w-full sm:w-auto">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Data
                </Button>
                <input 
                  type="file" 
                  accept=".json" 
                  onChange={handleImport}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div>
              <Button 
                variant="destructive" 
                className="flex items-center" 
                onClick={resetApp}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Reset App
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                This will delete all your compliments and settings. This action cannot be undone.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center text-sm text-muted-foreground">
            <p>Daily Positivity App</p>
            <p>Version 1.0.0</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
