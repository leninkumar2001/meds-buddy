
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Image, Camera, Clock } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/lib/supabaseClient";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel } from "@/components/ui/alert-dialog";

interface MedicationTrackerProps {
  date: string;
  isTaken: boolean;
  onMarkTaken: (date: string, imageFile?: File) => void;
  isToday: boolean;
}

const MedicationTracker = ({ date, isTaken, onMarkTaken, isToday }: MedicationTrackerProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [AlertMsg, setAlertMsg] = useState('');
  const [AlertMsgHeading, setAlertMsgHeading] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dailyMedication = {
    name: "Daily Medication Set",
    time: "8:00 AM",
    description: "Complete set of daily tablets"
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMarkTaken = async () => {
    let imageUrl = null;
    let patientId = '56b7acd1-809d-430a-a094-4383eb17f32a';
    if (selectedImage) {
      const fileExt = selectedImage.name.split('.').pop();
      const fileName = `public/${patientId}-${date}.${fileExt}`;
      const { data, error: uploadError } = await supabase
        .storage
        .from('medication-images')
        .upload(fileName, selectedImage);

      if (uploadError) {
        console.error("Image upload failed:", uploadError);
        setAlertMsgHeading('Error');
        setAlertMsg('Image upload failed');
        setOpen(true);
        return;
      }
      const { data: publicUrlData } = supabase
        .storage
        .from('medication-images')
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    const currentTime = new Date().toLocaleTimeString('en-GB', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const { error: insertError } = await supabase
      .from('medication_logs')
      .insert([
        {
          patient_id: patientId,
          date_taken: date,
          taken_at: currentTime,
          is_taken: true,
          image_url: imageUrl
        }
      ]);

    if (insertError) {
      console.error("Insert failed:", insertError);
      return;
    } else {
      setSelectedImage(null);
      setImagePreview(null);
      onMarkTaken(date, selectedImage || undefined);
      setAlertMsgHeading('Success');
      setAlertMsg('Medication Taken Successfully');
      setOpen(true);
    }
  };

  if (isTaken) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center p-8 bg-green-50 rounded-xl border-2 border-green-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Medication Completed!
            </h3>
            <p className="text-green-600">
              Great job! You've taken your medication for {format(new Date(date), 'MMMM d, yyyy')}.
            </p>
          </div>
        </div>

        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-green-800">{dailyMedication.name}</h4>
                <p className="text-sm text-green-600">{dailyMedication.description}</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Clock className="w-3 h-3 mr-1" />
              {dailyMedication.time}
            </Badge>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{AlertMsgHeading}</AlertDialogTitle>
            <AlertDialogDescription>
              {AlertMsg}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium">1</span>
            </div>
            <div>
              <h4 className="font-medium">{dailyMedication.name}</h4>
              <p className="text-sm text-muted-foreground">{dailyMedication.description}</p>
            </div>
          </div>
          <Badge variant="outline">
            <Clock className="w-3 h-3 mr-1" />
            {dailyMedication.time}
          </Badge>
        </CardContent>
      </Card>

      {/* Image Upload Section */}
      <Card className="border-dashed border-2 border-border/50">
        <CardContent className="p-6">
          <div className="text-center">
            <Image className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Add Proof Photo (Optional)</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Take a photo of your medication or pill organizer as confirmation
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              ref={fileInputRef}
              className="hidden"
            />

            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="mb-4"
            >
              <Camera className="w-4 h-4 mr-2" />
              {selectedImage ? "Change Photo" : "Take Photo"}
            </Button>

            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Medication proof"
                  className="max-w-full h-32 object-cover rounded-lg mx-auto border-2 border-border"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Photo selected: {selectedImage?.name}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Mark as Taken Button */}
      <Button
        onClick={handleMarkTaken}
        className="w-full py-4 text-lg bg-green-600 hover:bg-green-700 text-white"
        disabled={!isToday}
      >
        <Check className="w-5 h-5 mr-2" />
        {isToday ? "Mark as Taken" : "Cannot mark future dates"}
      </Button>

      {!isToday && (
        <p className="text-center text-sm text-muted-foreground">
          You can only mark today's medication as taken
        </p>
      )}
    </div>
  );
};

export default MedicationTracker;
