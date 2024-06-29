import React from 'react'
import {
    FaGithub,
    FaXTwitter,
    FaYoutube,
} from 'react-icons/fa6'

const Footer = () => {
    return (
        <footer className="bg-[#231f20] text-white px-12 py-8 flex justify-between flex-col md:flex-row">
            <div className="my-8 md:my-0">
                <ul className="space-y-4 flex flex-col items-center md:items-start">

                    <li>
                        <a href="https://x.com/coinchimpx" className="flex items-center">
                            <FaXTwitter className="w-6 h-6 mr-1" />
                            <p>Support me on Twitter (@coinchimpx)</p>
                        </a>
                    </li>
                    <li>
                        <a href="https://youtube.com/@coinchimptube" className="flex items-center">
                            <FaYoutube className="w-6 h-6 mr-1" />
                            <p>Support me on Youtube</p>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/coinchimp" className="flex items-center">
                            <FaGithub className="w-6 h-6 mr-1" />
                            <p>Support me Github</p>
                        </a>
                    </li>





                </ul>
            </div>
            <div className="md:max-w-[40%] text-sm">
                <p>
                The information in this site is for educational purposes only and does not constitute financial advice. We do not recommend any project as an investment and are not responsible for the technologies, assets, or standards presented.
                </p>
            </div>
        </footer>
    )
}

export default Footer
