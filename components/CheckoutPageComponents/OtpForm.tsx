// 'use client';
// import React, { useRef } from 'react';
// import styles from '../../styles/components/otpForm.module.scss';
// import { toast } from 'react-toastify';

// const OTPForm: React.FC = () => {
//     const inputs = useRef<Array<HTMLInputElement | null>>([]);

//     const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         if (/^[0-9]$/.test(value)) {
//             inputs.current[index]!.value = value;
//             if (index < 3) {
//                 inputs.current[index + 1]?.focus();
//             }
//         } else {
//             inputs.current[index]!.value = '';
//         }
//     };

//     const handleVerify = () => {
//         const otp = inputs.current.map((input) => input?.value).join('');
//         if (otp.length < 4 || inputs.current.some((input) => !input?.value)) {
//             toast.warning('Please enter all 4 digits of the OTP');
//             return;
//         }

//         // Continue with verification API call
//         toast.success('OTP verified!');
//     };


//     const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === 'Backspace') {
//             if (inputs.current[index]?.value === '') {
//                 if (index > 0) {
//                     inputs.current[index - 1]?.focus();
//                     inputs.current[index - 1]!.value = '';
//                 }
//             }
//         }
//         if (e.key === 'Enter') {
//             handleVerify(); // trigger verify action
//         }

//     };


//     return (
//         <div className={styles.otpContainer}>
//             <div className={styles.otpCard}>
//                 <h2>OTP Verification</h2>
//                 <p>Enter the 4-digit verification code that was sent to your phone number.</p>
//                 <div className={styles.otpInputGroup}>
//                     {Array(4)
//                         .fill('')
//                         .map((_, index) => (
//                             <input
//                                 key={index}
//                                 type="text"
//                                 maxLength={1}
//                                 className={styles.otpInput}
//                                 onChange={(e) => handleChange(index, e)}
//                                 onKeyDown={(e) => handleKeyDown(index, e)}
//                                 ref={(el) => (inputs.current[index] = el)}
//                             />
//                         ))}
//                 </div>
//                 <button className={styles.verifyBtn} onClick={handleVerify}>Verify</button>
//                 <p className={styles.resendText}>
//                     Didn’t receive code? <span className={styles.resendLink}>Resend</span>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default OTPForm;


'use client';
import React, { useRef } from 'react';
import styles from '../../styles/components/otpForm.module.scss';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';

const OTPForm = ({onSuccess}:any) => {
    const inputs = useRef<Array<HTMLInputElement | null>>([]);
    const router = useRouter();

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value)) {
            inputs.current[index]!.value = value;
            if (index < 5) {
                inputs.current[index + 1]?.focus();
            }
        } else {
            inputs.current[index]!.value = '';
        }
    };

    // const handleVerify = () => {
    //     const otp = inputs.current.map((input) => input?.value).join('');
    //     if (otp.length < 4 || inputs.current.some((input) => !input?.value)) {
    //         toast.warning('Please enter all 4 digits of the OTP');
    //         return;
    //     }

    //     // Continue with verification API call
    //     toast.success('OTP verified!');
    // };

    const handleVerify = async () => {
        const otp = inputs.current.map((input) => input?.value).join('');
        if (otp.length < 6 || inputs.current.some((input) => !input?.value)) {
            toast.warning('Please enter all 6 digits of the OTP');
            return;
        }

        try {
            const response = await axios.post(`http://staging-auto-house-hubli.8848digitalerp.com/api/method/summitapp.sdk.api?version=v2&method=verify_otp&entity=otp&phone=+919033273179&otp=${otp}`);
            console.log("verify_otp response", response);
            if (response.status === 200) {
                toast.success('OTP verified!');
                localStorage.setItem('otp_verified', 'true');
                onSuccess()
            } else {
                toast.error(response.data.message || 'Invalid OTP');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'OTP verification failed');
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            if (inputs.current[index]?.value === '') {
                if (index > 0) {
                    inputs.current[index - 1]?.focus();
                    inputs.current[index - 1]!.value = '';
                }
            }
        }
        if (e.key === 'Enter') {
            handleVerify(); // trigger verify action
        }

    };


    return (
        <div className={styles.otpContainer}>
            <div className={styles.otpCard}>
                <h2>OTP Verification</h2>
                <p>Enter the 6-digit verification code that was sent to your phone number.</p>
                <div className={styles.otpInputGroup}>
                    {Array(6)
                        .fill('')
                        .map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                className={styles.otpInput}
                                onChange={(e) => handleChange(index, e)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                ref={(el) => (inputs.current[index] = el)}
                            />
                        ))}
                </div>
                <button className={styles.verifyBtn} onClick={handleVerify}>Verify</button>
                <p className={styles.resendText}>
                    Didn’t receive code? <span className={styles.resendLink}>Resend</span>
                </p>
            </div>
        </div>
    );
};

export default OTPForm;
