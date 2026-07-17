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
    <section id="payment" className="py-24 md:py-32 bg-[#F9FAFB] border-b border-black/5 selection:bg-champagne/20">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-champagne" />
            <p className="text-champagne font-semibold tracking-[0.2em] uppercase text-[10px] md:text-xs">Action Required</p>
            <div className="w-8 h-[1px] bg-champagne" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-navy">Payment Options</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Card One: Online */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border border-black/5 p-8 md:p-14 shadow-sm hover:shadow-xl transition-all duration-700 ease-[0.16,1,0.3,1] flex flex-col"
          >
            <div className="mb-auto">
              <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center mb-8 border border-navy/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z" stroke="#061A2E" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
                  <path d="M1 10H23" stroke="#061A2E" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-navy mb-4">Pay Online</h3>
              <p className="text-sm md:text-base text-charcoal/60 font-sans mb-10 leading-relaxed">
                Secure card payment through Authorize.net
              </p>
            </div>
            
            <form name="PrePage" method="post" action="https://Simplecheckout.authorize.net/payment/CatalogPayment.aspx" className="mt-8" onSubmit={handleCardSubmit}>
              <input type="hidden" name="LinkId" value="29df0394-07ed-4a9e-8e2d-ac9039126c5d" />
              <input 
                type="submit" 
                value="Submit Card Payment" 
                className="w-full bg-navy text-white hover:bg-navy/90 py-4 font-semibold tracking-[0.15em] uppercase text-[10px] md:text-xs transition-colors duration-300 cursor-pointer text-center"
              />
            </form>
          </motion.div>

          {/* Card Two: Wire */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border border-black/5 p-8 md:p-14 shadow-sm hover:shadow-xl transition-all duration-700 ease-[0.16,1,0.3,1] flex flex-col"
          >
            <div className="mb-auto">
              <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center mb-8 border border-navy/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 21H21" stroke="#061A2E" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
                  <path d="M3 10H21" stroke="#061A2E" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
                  <path d="M5 6L12 3L19 6" stroke="#061A2E" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
                  <path d="M4 10V21" stroke="#061A2E" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
                  <path d="M20 10V21" stroke="#061A2E" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
                  <path d="M8 14V17" stroke="#061A2E" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
                  <path d="M12 14V17" stroke="#061A2E" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
                  <path d="M16 14V17" stroke="#061A2E" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-navy mb-4">Pay by Wire Transfer</h3>
              <p className="text-sm md:text-base text-charcoal/60 font-sans mb-10 leading-relaxed">
                Prefer wire transfer? Download the wire instructions below.
              </p>
            </div>

            <a 
              href="https://workdrive.zohoexternal.com/external/28c701d222f6195d0db6843cd8244de78fff5d1ef448b60fc7e8caf210c3a200/download"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWireDownload}
              className="mt-8 block text-center w-full border border-navy/20 text-navy hover:bg-navy/5 py-4 font-semibold tracking-[0.15em] uppercase text-[10px] md:text-xs transition-colors duration-300"
            >
              Download Wire Instructions
            </a>

            <div className="mt-8 pt-8 border-t border-black/5">
              <p className="text-charcoal/60 font-sans text-sm md:text-[13px] leading-relaxed mb-6">
                Once your wire has been sent, please submit your remittance confirmation below so we can match your payment and begin processing without delay.
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
                className="group relative flex items-center justify-center w-full bg-navy text-white hover:bg-navy/90 py-4 font-semibold tracking-[0.15em] uppercase text-[10px] md:text-xs transition-all duration-300 disabled:opacity-50 disabled:cursor-wait"
              >
                {uploadState === 'uploading' ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Upload Remittance
                  </span>
                )}
              </button>
              
              {/* Success/Error States */}
              <div className="mt-4 min-h-[44px]">
                {uploadState === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 text-[13px] text-navy bg-navy/5 p-3 border border-navy/10"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
                    </svg>
                    <p className="leading-relaxed">
                      Remittance received. <br/>
                      {uploadedName && <span className="text-charcoal/50 block mt-1 truncate max-w-[240px]" title={uploadedName}>{uploadedName}</span>}
                    </p>
                  </motion.div>
                )}
                {uploadState === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 text-[13px] text-red-800 bg-red-50 p-3 border border-red-100"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
                      <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
                      <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
                    </svg>
                    <p className="leading-relaxed">
                      Upload could not be processed. Please try again or email remittance to <a href="mailto:rose@ccacontact.com" className="underline hover:text-red-600 transition-colors">rose@ccacontact.com</a>.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
