import Link from "next/link";
import { BarchartTemplate } from "@/packages/shared/src/components/Charts/Bar/BarchartTemplate";

export default function DashboardPage() {
    return <div>
        <h1>Dashboard</h1>
        <Link href="/">Log out</Link>
        <BarchartTemplate />
    </div>
}
