import { useAccount } from "@/components/hooks/web3";
import { Breadcrumbs } from "@/components/ui/common";
import { ETHRates, Walletbar } from "@/components/ui/web3";

const LINKS = [{
    href: "/marketplace",
    value: "Buy"
}, {
    href: "/marketplace/courses/owned",
    value: "My Courses"
}, {
    href: "/marketplace/courses/manage",
    value: "Manage Courses",
    requireAdmin: true
}];

const Header = () => {
    const { account } = useAccount()
    return (
        <>
            <Walletbar />
            <ETHRates />
            <div className="flex flex-row-reverse pb-4 px-4 sm:px-6 lg:px-8">
            <Breadcrumbs 
                isAdmin={account.isAdmin}
                items={LINKS} 
            />
            </div>
        </>
    )
}

export default Header;