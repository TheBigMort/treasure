/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ScrollContext } from '@src/utils/scroll-observer';
import Image from 'next/image';
import React, { useCallback, useContext, useRef, useState } from 'react';

const Masthead: React.FC = () => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const refContainer = useRef<HTMLDivElement>(null);
    const { scrollY } = useContext(ScrollContext);

    let progress = 0;

    const { current: elContainer } = refContainer;

    if (elContainer) {
        progress = Math.min(1, scrollY / elContainer.clientHeight);
    }
    const handleImageLoaded = useCallback(() => {
        setImageLoaded(true);
    }, []);

    return (
        <div
            ref={refContainer}
            className="min-h-screen flex flex-col items-center justify-center sticky top-0 -z-10"
            style={{ transform: `translateY(-${progress * 20}vh)` }}
        >
            <img className="absolute w-full h-full object-cover" src="/assets/bg-image.webp" />

            <div className="p-12 font-bold z-10 text-white drop-shadow-[0_5px_3px_rgba(0,0,0,0.4)] text-center flex-1 flex items-center justify-center flex-col">
                <h1 className="mb-6 text-4xl xl:text-5xl">Treasure (for warriors)</h1>
                <h2 className="mb-2 text-2xl xl:text-3xl tracking-tight">
                    <span>
                        10,000 Randomly Generated Treasure Chests Containing Battle gear on the
                        Ethereum blockchain
                    </span>
                </h2>
                <h2 className="mb-2 text-2xl xl:text-3xl tracking-tight">
                    <span>250,000+ Traits</span>
                </h2>
                <h2 className="mb-2 text-2xl xl:text-3xl tracking-tight">
                    <span>1B + Possible chest combinations</span>
                </h2>
            </div>
            <div
                className={`flex-grow-0 pb-6 md:pb-10 transition-all duration-1000 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0 -translate-y-10'
                }`}
            >
                <Image
                    src="/assets/arrow-down2.png"
                    width={120}
                    height={94}
                    alt="scroll down"
                    onLoadingComplete={handleImageLoaded}
                />
            </div>
        </div>
    );
};
export default Masthead;
