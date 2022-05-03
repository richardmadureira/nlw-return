import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../Closebutton";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedbackSent: (feedbackSend: boolean) => void;
}
export function FeedbackContentStep({feedbackType, onFeedbackRestartRequested, onFeedbackSent}: FeedbackContentStepProps) {
    const {title, image:{source, alt} } = feedbackTypes[feedbackType];
    const [screenshot, setScreenshot] = useState<string | null>('');
    const [comment, setComment] = useState('');

    function handleSubmitFeedback(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log({screenshot, comment});
        onFeedbackSent(true);
    }

    return (
        <>
            <header>
                <button onClick={onFeedbackRestartRequested} className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100" title='Voltar'>
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={source} alt={alt} className="w-6 h-6"/>
                    {title}
                </span>
                <CloseButton />
            </header>
            <form noValidate onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea onChange={e => setComment(e.target.value)} className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin" placeholder="Conte com detalhes o que está acontecendo" />
                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton screenshot={screenshot} onScrenshotTook={setScreenshot}/>
                    <button 
                        type="submit"
                        disabled={comment.length===0}
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-gray-500">
                        Enviar feedback
                    </button>
                </footer>
            </form>
        </>
    );
}