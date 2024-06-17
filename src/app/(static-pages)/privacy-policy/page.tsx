import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import bgImg from '@/images/bg-cars/bg-car-12.webp';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function CookiePolicyPage() {
  return (
    <div className='markdown-styles relative container my-12 xl:my-20'>
      <Image
        className='hidden md:block h-[40vh] sticky inset-0 top-1/2 -translate-y-1/2 object-contain w-full max-w-7xl m-auto opacity-[0.08] -z-10'
        src={bgImg}
        alt='car background image'
        priority
      />

      <div className='md:-mt-[40vh]'>
        <h1>Privacy Policy</h1>
        <div className='w-14 border-b border-neutral-300 dark:border-neutral-700 mb-6 lg:mb-8'></div>
        <h2>General Information and Mandatory Notices</h2>
        <h3>Identification of the Responsible Party</h3>
        <h4>The responsible party for data processing on this website is:</h4>
        <div className='text-neutral-600 dark:text-neutral-300'>
          <p>
            FinDax GmbH <br />
            Theodor-Fontane-Straße 2 <br />
            22848 Norderstedt <br /> <br />
            IBAN: DE39 4401 0046 0478 7494 69 <br />
            BIC: PBNKDEFF <br />
            Tax Number: 44/780/03655 <br /> <br />
            VAT ID No. DE300567500 <br />
            HRB 126671 <br /> <br />
            Email: <Link href='mailto:info@findax.eu'>info@findax.eu</Link>
            <br />
            Website: <Link href='https://www.weltcar.de'>www.weltcar.de</Link>
          </p>
          <p>
            The responsible party, alone or together with others, decides on the
            purposes and means of processing personal data (e.g., names, contact
            details, etc.).
          </p>
        </div>

        <h2>Revocation of Your Consent to Data Processing</h2>
        <p className='text-neutral-600 dark:text-neutral-300'>
          Some data processing operations are only possible with your explicit
          consent. You may revoke your consent at any time. An informal email
          notification is sufficient for the revocation. The legality of the
          data processing carried out until the revocation remains unaffected by
          the revocation.
        </p>

        <h2>Right to File Complaints with Regulatory Authorities</h2>
        <p className='text-neutral-600 dark:text-neutral-300'>
          As the data subject, you have the right to file a complaint with the
          competent supervisory authority in the event of a data protection
          violation. The competent supervisory authority for data protection
          issues is the state data protection officer of the federal state in
          which our company is headquartered. The following link provides a list
          of data protection officers and their contact details:{' '}
          <Link
            href='https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html'
            target='_blank'
            rel='noopener'
          >
            https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html
          </Link>
          .
        </p>

        <h2>Right to Data Portability</h2>
        <p className='text-neutral-600 dark:text-neutral-300'>
          You have the right to have data that we process based on your consent
          or in fulfillment of a contract automatically handed over to you or to
          a third party. The data will be provided in a machine-readable format.
          If you request the direct transfer of the data to another responsible
          party, this will only be done to the extent that it is technically
          feasible.
        </p>

        <h2>Right to Information, Correction, Blocking, Deletion</h2>
        <p className='text-neutral-600 dark:text-neutral-300'>
          Within the framework of the applicable legal provisions, you have the
          right at any time to free information about your stored personal data,
          their origin, and recipient, as well as the purpose of the data
          processing and, if applicable, a right to correction, blocking, or
          deletion of this data. You can contact us at any time using the
          contact details provided in the legal notice if you have further
          questions on the topic of personal data.
        </p>

        <h2>SSL or TLS Encryption</h2>
        <p className='text-neutral-600 dark:text-neutral-300'>
          For security reasons and to protect the transmission of confidential
          content that you send to us as the site operator, our website uses SSL
          or TLS encryption. This means that data you transmit via this website
          cannot be read by third parties. You can recognize an encrypted
          connection by the "https://" address line of your browser and the lock
          icon in the browser line.
        </p>

        <h2>Server Log Files</h2>
        <div className='text-neutral-600 dark:text-neutral-300'>
          <p>
            The provider of the website automatically collects and stores
            information in server log files that your browser automatically
            transmits to us. These are:
          </p>
          <ul>
            <li>Page visited on our domain</li>
            <li>Date and time of the server request</li>
            <li>Browser type and browser version</li>
            <li>Operating system used</li>
            <li>Referrer URL</li>
            <li>Hostname of the accessing computer</li>
            <li>IP address</li>
          </ul>
          <p>
            There is no merging of this data with other data sources. The basis
            for data processing is Art. 6(1)(b) DSGVO, which permits the
            processing of data to fulfill a contract or pre-contractual
            measures.
          </p>
        </div>

        <h2>Contact Form</h2>
        <div className='text-neutral-600 dark:text-neutral-300'>
          <p>
            Data transmitted via the contact form, including your contact
            details, will be stored to process your request or to be available
            for follow-up questions. This data will not be passed on without
            your consent.
          </p>
          <p>
            The processing of the data entered in the contact form takes place
            exclusively based on your consent (Art. 6(1)(a) DSGVO). You may
            revoke your consent at any time. An informal email notification is
            sufficient for the revocation. The legality of the data processing
            carried out until the revocation remains unaffected by the
            revocation.
          </p>
          <p>
            Data transmitted via the contact form will remain with us until you
            request us to delete it, revoke your consent to storage, or the
            purpose for data storage no longer applies. Mandatory legal
            provisions - especially retention periods - remain unaffected.
          </p>
        </div>

        <h2>Newsletter Data</h2>
        <div className='text-neutral-600 dark:text-neutral-300'>
          <p>
            To send our newsletter, we need an email address from you.
            Verification of the specified email address is necessary, and
            consent to receive the newsletter is required. Additional data is
            not collected or is voluntary. The data is used exclusively for
            sending the newsletter.
          </p>
          <p>
            The data provided during newsletter registration will be processed
            solely based on your consent (Art. 6(1)(a) DSGVO). You may revoke
            your consent at any time. An informal email notification is
            sufficient for the revocation or you can use the "unsubscribe" link
            in the newsletter. The legality of the data processing operations
            already carried out remains unaffected by the revocation.
          </p>
          <p>
            Data entered to set up the subscription will be deleted if you
            cancel your subscription. If this data has been transmitted to us
            for other purposes and elsewhere, it will remain with us.
          </p>
        </div>

        <h2>YouTube</h2>
        <div className='text-neutral-600 dark:text-neutral-300'>
          <p>
            Our website uses plugins from YouTube for the integration and
            display of video content. The provider of the video portal is
            YouTube, LLC, 901 Cherry Ave., San Bruno, CA 94066, USA.
          </p>
          <p>
            When you visit a page with an integrated YouTube plugin, a
            connection to YouTube's servers is established. YouTube thus learns
            which of our pages you have visited.
          </p>
          <p>
            YouTube can directly assign your surfing behavior to your personal
            profile if you are logged into your YouTube account. You can prevent
            this by logging out of your YouTube account beforehand.
          </p>
          <p>
            The use of YouTube is in the interest of an attractive presentation
            of our online offers. This constitutes a legitimate interest within
            the meaning of Art. 6(1)(f) DSGVO.
          </p>
          <p>
            For details on the handling of user data, please refer to YouTube's
            privacy policy at:{' '}
            <Link
              href='https://www.google.de/intl/de/policies/privacy'
              target='_blank'
              rel='noopener'
            >
              https://www.google.de/intl/de/policies/privacy
            </Link>
            .
          </p>
        </div>

        <h2>Cookies</h2>
        <div className='text-neutral-600 dark:text-neutral-300'>
          <p>
            Our website uses cookies. These are small text files that your web
            browser stores on your end device. Cookies help us to make our offer
            more user-friendly, effective, and secure.
          </p>
          <p>
            Some cookies are "session cookies." Such cookies are deleted
            automatically at the end of your browser session. Other cookies
            remain on your end device until you delete them yourself. These
            cookies help us to recognize you when you return to our website.
          </p>
          <p>
            With a modern web browser, you can monitor, restrict, or prevent the
            setting of cookies. Many web browsers can be configured to delete
            cookies automatically when the program is closed. Disabling cookies
            may result in limited functionality of our website.
          </p>
          <p>
            The setting of cookies necessary for electronic communications or
            the provision of certain functions you desire (e.g., shopping cart)
            is based on Art. 6(1)(f) DSGVO. As the operator of this website, we
            have a legitimate interest in storing cookies for the technically
            error-free and smooth delivery of our services. If other cookies
            (e.g., for analysis functions) are set, they will be treated
            separately in this privacy policy.
          </p>
        </div>

        <h2>Google Analytics</h2>
        <div className='text-neutral-600 dark:text-neutral-300'>
          <p>
            Our website uses functions of the web analytics service Google
            Analytics. The provider of the web analytics service is Google Inc.,
            1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.
          </p>
          <p>
            Google Analytics uses "cookies." These are small text files that
            your web browser stores on your end device and which enable an
            analysis of website usage. The information generated by the cookie
            about your use of our website is transmitted to a Google server and
            stored there. The server location is usually the USA.
          </p>
          <p>
            The setting of Google Analytics cookies is based on Art. 6(1)(f)
            DSGVO. As the operator of this website, we have a legitimate
            interest in analyzing user behavior to optimize our web offer and,
            if necessary, advertising.
          </p>
          <p>
            For details on the handling of user data, please refer to Google's
            privacy policy at:{' '}
            <Link
              href='https://support.google.com/analytics/answer/6004245?hl=de'
              target='_blank'
              rel='noopener'
            >
              https://support.google.com/analytics/answer/6004245?hl=de
            </Link>
            .
          </p>
        </div>

        <h2>Amendments to the Privacy Policy</h2>
        <p className='text-neutral-600 dark:text-neutral-300'>
          We reserve the right to amend this privacy policy to comply with
          current legal requirements or to implement changes to our services in
          the privacy policy, e.g., when introducing new services. Your new
          visit will be subject to the new privacy policy.
        </p>
      </div>
    </div>
  );
}
