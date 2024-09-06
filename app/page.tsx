import CardLogin from "@/packages/components/CardLogin";
//Admin, Docente, Aspirante, Alumno
export default function LoginPage() {
    return (
        <div className="flex flex-col justify-center items-center">
            <img className="w-[461px] h-[188px] mb-8 mt-3.5" src="/logoTSJ.svg" alt="logoTSJ" />
            <CardLogin />
        </div>
    );
}

