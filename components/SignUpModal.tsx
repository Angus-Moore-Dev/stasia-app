'use client';

import { Button, Checkbox, Input, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from '@mantine/form';
import { createBrowserClient } from "@/utils/createBrowserClient";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { User } from "@supabase/supabase-js";


export default function SignUpModal()
{
    const router = useRouter();
    const supabase = createBrowserClient();
    const [signUp, setSignUp] = useState(false);
    const [otp, setOtp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const [showConfirmEmail, setShowConfirmEmail] = useState(false);

    const [signInWithCode, setSignInWithCode] = useState(false);

    useEffect(() => {
        // Set the forms to their initial values when the modal is opened
        form.setInitialValues({
            email: '',
            password: '',
        });
    }, [opened]);


    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length >= 8 ? null : otp ? null : signInWithCode ? null : 'Password is too short'),
        },
    });

    const signUpUser = async ({ email, password }: { email: string, password: string }) =>
    {
        setIsLoading(true);

        const { error } = await supabase
        .auth
        .signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`
            }
        });

        if (error)
        {
            notifications.show({
                title: 'Error Signing In',
                message: error.message,
                color: 'red'
            });
            return;
        }

        setShowConfirmEmail(true);
        setIsLoading(false);
    }

    const signInUser = async ({ email, password }: { email: string, password: string }) =>
    {
        setIsLoading(true);
        const { error } = 
        signInWithCode ?
        await supabase.auth.verifyOtp({ email, token: password, type: 'email' }) :
        await supabase.auth.signInWithPassword({ email, password });

        if (error)
        {
            notifications.show({
                title: 'Error Signing In',
                message: error.message,
                color: 'red'
            });
            setIsLoading(false);
            return;
        }

        router.refresh();
    }

    const sendOTPRequest = async ({ email }: { email: string }) =>
    {
        if (isLoading) return;

        setIsLoading(true);

        const { error } = await supabase
        .auth
        .signInWithOtp({ email });

        if (error)
        {
            notifications.show({
                title: 'Error Sending OTP',
                message: error.message,
                color: 'red',
                variant: 'filled'
            });
        }
        else
        {
            notifications.show({
                title: 'OTP Sent',
                message: 'An OTP has been sent to your email address.',
                color: 'green',
                variant: 'filled'
            });
        }
        setIsLoading(false);
        setOtp(false);
        setSignUp(false);
    };

    return <>
    <Modal opened={opened} onClose={close} centered size={'md'} withCloseButton={false}>
        <Image src='/logo.png' alt='Logo' width={384} height={64.5} className="mx-auto" />
        {
            !showConfirmEmail &&
            <div className="w-full flex flex-col mt-4">
                <form
                onSubmit={form.onSubmit((values) => 
                {
                    if (otp)
                    {
                        sendOTPRequest(values);
                        return;
                    }

                    if (signUp)
                        signUpUser(values);
                    else
                        signInUser(values);
                })}
                className="w-full flex flex-col gap-4">
                    <TextInput label="Your Email" placeholder="mr.electric@dreamland.com" required withAsterisk {...form.getInputProps('email')} />
                    {
                        !otp &&
                        <>
                        <TextInput label="Your Password" placeholder="********" type="password" required={!otp} withAsterisk={!otp} {...form.getInputProps('password')} />
                        <Checkbox label="I am using a code" className="-mt-2 text-sm ml-auto" checked={signInWithCode} onClick={() => setSignInWithCode(!signInWithCode)} />
                        </>
                    }
                    <Button variant="filled" type="submit" loading={isLoading}>
                        { !otp && 'Sign' } {signUp ? 'Up' : otp ? 'Send Code to Email' : 'In'}
                    </Button>
                </form>
                <div className="flex flex-row items-center gap-2 justify-between">
                    {
                        !otp &&
                        <button className="text-blue-500 transition hover:text-blue-400 underline text-sm mt-4" onClick={() => { setOtp(true); setSignUp(false); }}>
                            I forgot my password
                        </button>
                    }
                    <button className="text-blue-500 transition hover:text-blue-400 underline text-sm ml-auto mt-4" onClick={() => { setSignUp(!signUp); setOtp(false); }}>
                        {signUp ? 'I Have An Account' : 'Create A New Account'}
                    </button>
                </div>
            </div>
        }
        {
            showConfirmEmail &&
            <div className="p-4 flex flex-col items-center my-10">
                <p className="text-center">
                    Thank you for signing up! Please check your email to confirm your account.
                </p>
                <Button variant="filled" onClick={() => {
                    setShowConfirmEmail(false);
                    form.reset();
                }} className="mt-4">
                    Close
                </Button>
            </div>
        }
    </Modal>

    <Button variant="filled" onClick={open}>Sign In To Stasia</Button>
    </>
}