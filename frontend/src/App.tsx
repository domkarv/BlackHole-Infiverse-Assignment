import { useEffect, useState } from "react";
import ChatbotPage from "./components/chat";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./components/ui/dialog";

export default function App() {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    setShowDialog(true);
  }, []);

  return (
    <main className='font-poppins'>
      <ChatbotPage />

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-red-600 text-xl font-bold'>
              Note
            </DialogTitle>
            <DialogDescription className='text-base text-primary'>
              Before starting, please be aware that page refresh may result in
              loss of chat history.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
}
