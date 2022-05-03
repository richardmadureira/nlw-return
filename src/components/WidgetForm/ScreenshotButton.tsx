import { Camera, Trash } from "phosphor-react";
import html2canvas from 'html2canvas';
import { Loading } from "../Loading";
import { useState } from "react";

interface ScreenshotButtonProps {
    screenshot: string | null;
    onScrenshotTook: (screenshot: string | null) => void;
}
export function ScreenshotButton({ screenshot, onScrenshotTook}: ScreenshotButtonProps) {
    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);
    
    async function handleTakeScreenshot(){
        setIsTakingScreenshot(true);
        const canvas = html2canvas(document.querySelector('html')!);
        const base64image = (await canvas).toDataURL("image/png");
        onScrenshotTook(base64image);
        setIsTakingScreenshot(false);
    }

    if(screenshot){
        return (
            <button 
                type="button"
                className="p-1 h-10 w-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
                onClick={() => onScrenshotTook(null)}
                title="Remover screenshot"
                style={{
                    backgroundImage: `url(${screenshot})`,
                    backgroundPosition: 'right bottom',
                    backgroundSize: 180,
                }}
            >
                <Trash weight="fill"/>
            </button>
        );
    }

    return (
        <button type='button' onClick={handleTakeScreenshot} className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors">
            {isTakingScreenshot ? <Loading/> : <Camera className="w-6 h-6" />}
        </button>
    );
}