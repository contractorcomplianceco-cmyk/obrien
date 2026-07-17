import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  useNotifyPaymentSelected,
  useRequestUploadUrl,
  useSubmitRemittance,
} from '@workspace/api-client-react';

export function Payment() {
  const notifyPayment = useNotifyPaymentSelected();
  const requestUploadUrl = useRequestUploadUrl();
  const submitRemittance = useSubmitRemittance();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadState, setUploadState] = useState<
    'idle' | 'uploading' | 'success' | 'error'
  >('idle');
  const [uploadedName, setUploadedName] = useState<string | null>(null);

  const handleCardSubmit = () => {
    // sendBeacon survives the navigation to Authorize.net; a normal fetch
    // can be cancelled when the browser unloads the page.
    const payload = JSON.stringify({ method: 'card' });
    const url = `${import.meta.env.BASE_URL}api/notifications/payment`;
    if (!navigator.sendBeacon?.(url, new Blob([payload], { type: 'application/json' }))) {
      notifyPayment.mutate({ data: { method: 'card' } });
    }
  };

  const handleWireDownload = () => {
    notifyPayment.mutate({ data: { method: 'wire' } });
  };

  const handleRemittanceFile = async (file: File) => {
    setUploadState('uploading');
    setUploadedName(file.name);
    try {
      const { uploadURL, objectPath } = await requestUploadUrl.mutateAsync({
        data: {
          name: file.name,
          size: file.size,
          contentType: file.type || 'application/octet-stream',
        },
      });

      const putRes = await fetch(uploadURL, {
        method: 'PUT',
        headers: { 'Content-Type': file.type || 'application/octet-stream' },
        body: file,
      });
      if (!putRes.ok) throw new Error(`Upload failed (${putRes.status})`);

      await submitRemittance.mutateAsync({
        data: { objectPath, fileName: file.name },
      });
      setUploadState('success');
    } catch {
      setUploadState('error');
    }
  };

  return (
    <section id="payment" className="py-32 bg-gray-50 border-b border-gray-200">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <p className="text-champagne font-bold tracking-[0.2em] uppercase text-xs mb-4">Action</p>
          <h2 className="text-3xl md:text-5xl font-serif text-navy">Payment Options</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card One: Online */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-gray-200 p-10 md:p-14 shadow-sm hover:shadow-xl transition-shadow duration-500 flex flex-col"
          >
            <div className="mb-auto">
              <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center mb-8">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 10H23" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-navy mb-4">Pay Online</h3>
              <p className="text-charcoal/70 font-sans mb-10 leading-relaxed">
                Secure card payment through Authorize.net
              </p>
            </div>
            
            <form name="PrePage" method="post" action="https://Simplecheckout.authorize.net/payment/CatalogPayment.aspx" className="mt-8" onSubmit={handleCardSubmit}>
              <input type="hidden" name="LinkId" value="29df0394-07ed-4a9e-8e2d-ac9039126c5d" />
              <input 
                type="submit" 
                value="Submit Card Payment" 
                className="w-full bg-navy text-white hover:bg-champagne hover:text-navy py-5 font-bold tracking-widest uppercase text-xs transition-colors duration-300 cursor-pointer"
              />
            </form>
          </motion.div>

          {/* Card Two: Wire */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white border border-gray-200 p-10 md:p-14 shadow-sm hover:shadow-xl transition-shadow duration-500 flex flex-col"
          >
            <div className="mb-auto">
              <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center mb-8">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 21H21" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 10H21" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 6L12 3L19 6" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 10V21" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 10V21" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 14V17" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 14V17" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 14V17" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-navy mb-4">Pay by Wire Transfer</h3>
              <p className="text-charcoal/70 font-sans mb-10 leading-relaxed">
                Prefer wire transfer? Download the wire instructions below.
              </p>
            </div>

            <a 
              href="https://workdrive.zohoexternal.com/external/28c701d222f6195d0db6843cd8244de78fff5d1ef448b60fc7e8caf210c3a200/download"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWireDownload}
              className="mt-8 block text-center w-full border-2 border-navy text-navy hover:bg-navy hover:text-white py-4 font-bold tracking-widest uppercase text-xs transition-colors duration-300"
            >
              Download Wire Instructions PDF
            </a>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-charcoal/70 font-sans text-sm leading-relaxed mb-5">
                Once your wire has been sent, please submit your remittance
                confirmation below so we can match your payment and begin
                processing without delay.
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.webp,.heic,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void handleRemittanceFile(file);
                  e.target.value = '';
                }}
              />
              <button
                type="button"
                disabled={uploadState === 'uploading'}
                onClick={() => fileInputRef.current?.click()}
                className="block text-center w-full bg-navy text-white hover:bg-champagne hover:text-navy py-4 font-bold tracking-widest uppercase text-xs transition-colors duration-300 disabled:opacity-60 disabled:cursor-wait"
              >
                {uploadState === 'uploading'
                  ? 'Uploading…'
                  : 'Upload Wire Remittance'}
              </button>
              {uploadState === 'success' && (
                <p className="mt-4 text-sm font-sans text-navy">
                  Remittance received — thank you.{' '}
                  {uploadedName && (
                    <span className="text-charcoal/60">({uploadedName})</span>
                  )}
                </p>
              )}
              {uploadState === 'error' && (
                <p className="mt-4 text-sm font-sans text-red-700">
                  We could not process the upload. Please try again or email
                  the remittance to rose@ccacontact.com.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
