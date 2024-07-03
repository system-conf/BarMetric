import React from 'react';

const Footer = () => {
  return (
    <div className="bg-stone-800 text-white py-0">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          Created by{' '}
          <a
            href="https://github.com/system-conf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            system.conf
          </a>{' '}
          /{' '}
          <a
            href="https://github.com/system-conf/urlShorterReact"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            GitHub
          </a>{' '}
          / License
        </p>
      </div>
    </div>
  );
};

export default Footer;
