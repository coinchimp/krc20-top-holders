import React, { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { FaYoutube, FaGithub, FaXTwitter } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { tick } = useParams();

    const handleMenuOpen = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="sticky top-0 bg-[#231f20] flex flex-col text-white items-center justify-between px-12 py-6 z-10">
            <div className="flex w-full items-center justify-between">
                <a href="/" className="flex items-center">
                    <img
                        src="krc20_logo_.jpg"
                        alt="Logo"
                        className="h-14 w-25"
                    />
                </a>

                {/* Desktop View */}
                <div className="hidden md:block">
                    <ul className="flex space-x-8 text-gray-300">
                        <li className="transition-all ease-in-out hover:text-white">
                            <a
                                href="https://github.com/coinchimp"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaGithub className="h-6 w-6" />
                            </a>
                        </li>                        
                    </ul>
                </div>

                {/* Mobile View */}
                <div className="md:hidden">
                    <IoMenu className="h-8 w-8" onClick={handleMenuOpen} />
                </div>
            </div>

            <div className={`${
                isMenuOpen ? '' : 'hidden'
                } absolute w-full top-20 left-0 right-0 text-center bg-[#231f20] py-8 md:hidden`}
            >
                <ul className="space-y-10 pt-8">
                    <li className="transition-all ease-in-out hover:text-white">
                        <a
                            href="https://youtube.com/@coinchimptube"
                            target="_blank"
                            rel="noopener noreferrer"   
                            className="flex items-center justify-center"
                        >
                            <FaYoutube className="h-6 w-6 mr-2" />
                            <p>Support me on Youtube</p>
                        </a>
                    </li>
                    <li className="transition-all ease-in-out hover:text-white">
                        <a
                            href="https://x.com/coinchimpx"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center"
                        >
                            <FaXTwitter className="h-6 w-6 mr-2" />
                            <p>Support me on Twitter</p>
                        </a>
                    </li>
                    <li className="transition-all ease-in-out hover:text-white">
                        <a
                            href="https://github.com/coinchimp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center"
                        >
                            <FaGithub className="h-6 w-6 mr-2" />
                            <p>Support me on Github</p>
                        </a>
                    </li>                    
                </ul>
            </div>

            <div className="text-center mt-4 md:mt-8">
                <h1 className="text-2xl md:text-3xl font-bold">KRC20 {tick} Top Holders</h1>
                <p className="text-lg md:text-2xl mt-2">
                    by <a href="https://x.com/coinchimpx" target="_blank" rel="noopener noreferrer" className="underline">coinchimp</a>
                </p>
            </div>
        </div>
    );
};

export default Navbar;
