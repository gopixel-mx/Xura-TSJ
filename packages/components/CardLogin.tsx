"use client"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { signIn } from 'next-auth/react';
import {
    Google,
    PersonOutlineOutlined,
    VisibilityOffOutlined,
} from '@mui/icons-material';

export default function CardLogin() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="shadow-md flex flex-col justify-start items-center w-[500px] h-[644px] bg-white drop-shadow-2xl rounded-lg">
                <div className="flex flex-col justify-start items-start w-[355px] mt-12 h-[417px]">
                    <div className="flex flex-col justify-start items-start w-[355px] h-[105px]">
                        <div className="text-center text-indigo-900 font-bold text-[30px] leading-[130%]">
                            Xura
                        </div>

                        <div className="flex flex-row justify-start items-start mt-[30px] w-full h-[36px] relative">
                            <div className="bg-indigo-900 rounded-[10px] w-full h-full absolute"></div>

                            <div
                                className="flex flex-row justify-start items-start absolute left-[3px] top-[3px] w-[172.97px] h-[30px]">
                                <div className="bg-white rounded-[10px] w-full h-full absolute"></div>

                                <div className="text-black font-semibold text-[14px] absolute left-[60px] top-[6px]">
                                    Ingresa
                                </div>
                            </div>

                            <div
                                className="flex flex-row justify-start items-start absolute left-[226px] top-[9px] w-[75.42px] h-[18px]">
                                <div className="text-white font-semibold text-[14px]">
                                    Registrate
                                </div>
                            </div>
                        </div>
                    </div>

                    <TextField
                        label="Correo electrónico"
                        variant="outlined"
                        className="mt-[32px] w-full"
                        placeholder="Email o CURP"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <PersonOutlineOutlined/>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="Contraseña"
                        variant="outlined"
                        type="password"
                        className="mt-[32px] w-full"
                        placeholder="Contraseña"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <VisibilityOffOutlined/>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <div
                        className="text-right text-blue-500 underline font-normal text-[14px] leading-[125%] mt-[32px] w-full">
                        ¿Olvidaste tu contraseña?
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        className="mt-[32px] w-full h-[54px] px-[152px] py-[17px] bg-[#32169b] rounded-[10px] justify-center items-center gap-2.5 inline-flex hover:bg-[#14005E]"
                    >
                        Ingresar
                    </Button>

                    <div className="text-left text-opacity-70 text-black font-normal text-[14px] leading-[125%] mt-4">
                        O Ingresa con
                    </div>

                    <div className="border border-gray-300 w-[123px] h-0 mt-4"></div>

                    <Button
                        variant="contained"
                        color="primary"
                        className="w-[355px] mt-4 text-black text-sm font-normal leading-[17.50px] bg-[#d8dadc]"
                        startIcon={<Google />}
                        onClick={() => signIn('google')}
                    >
                        Ingresar con Google
                    </Button>

                    <div className="text-left font-normal text-[14px] leading-[125%] mt-auto mb-4">
                        <span className="text-black">¿No tienes una cuenta?</span>
                        <span className="text-indigo-900"> Registrate</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
