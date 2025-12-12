import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import * as LucideIcons from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useUsersContext } from "@/app/AllContext/UsersContext";

const Index = () => {
    const { getWallets } = useUsersContext();
    const [wallets, setWallets] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getWallets();
            setWallets(data);
        };
        fetchData();
    }, []);

    const copyToClipboard = (address) => {
        navigator.clipboard.writeText(address);
    };

    const iconMapping = {
        ETH: LucideIcons.Zap,
        Ethereum: LucideIcons.Zap,

        BTC: LucideIcons.Bitcoin,
        Bitcoin: LucideIcons.Bitcoin,

        USDT: LucideIcons.DollarSign,
        Tether: LucideIcons.DollarSign,
        "Tether USD": LucideIcons.DollarSign,
    };

    const colorMapping = {
        ETH: "from-purple-500 to-indigo-600",
        BTC: "from-orange-500 to-yellow-600",
        USDT: "from-green-500 to-emerald-600",
    };

    const bgColorMapping = {
        ETH: "from-purple-50 to-indigo-50",
        BTC: "from-orange-50 to-yellow-50",
        USDT: "from-green-50 to-emerald-50",
    };

    return (
        <TabsContent value="deposit" className="mt-0">
            <div className="grid gap-6 sm:gap-8">
                <Card className="p-4 sm:p-6 lg:p-8 bg-white/70 backdrop-blur-sm shadow-2xl border border-white/20 rounded-3xl">
                    <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                        <div className="p-2 sm:p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-600">
                            <LucideIcons.Wallet className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                            Deposit Addresses
                        </h2>
                    </div>

                    <div className="grid gap-6 sm:gap-8 mb-8">
                        {wallets.map((wallet) => {
                            const Icon =
                                iconMapping[wallet.walletName] || LucideIcons.Wallet;

                            const color =
                                colorMapping[wallet.walletName] ||
                                "from-gray-500 to-gray-600";

                            const bgColor =
                                bgColorMapping[wallet.walletName] ||
                                "from-gray-50 to-gray-100";

                            return (
                                <div
                                    key={wallet._id}
                                    className="p-4 sm:p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-xl transition-all duration-300"
                                >
                                    {/* Header */}
                                    <div className="flex items-center gap-3 sm:gap-4 mb-4">
                                        <div
                                            className={`p-2 sm:p-3 rounded-xl bg-gradient-to-r ${color} shadow-lg`}
                                        >
                                            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-base sm:text-lg font-bold text-slate-800">
                                                {wallet.walletName}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-slate-500">
                                                {wallet.walletName}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="mb-4">
                                        <p className="text-xs sm:text-sm font-semibold text-slate-600 mb-2">
                                            Deposit Address:
                                        </p>
                                        <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                                            <code className="text-xs sm:text-sm font-mono text-slate-700 flex-1 truncate">
                                                {wallet.walletAddress}
                                            </code>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() =>
                                                    copyToClipboard(wallet.walletAddress)
                                                }
                                                className="flex-shrink-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                            >
                                                <LucideIcons.Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Instructions */}
                                    <div
                                        className={`p-3 sm:p-4 bg-gradient-to-br ${bgColor} rounded-xl border-l-4 border-l-current`}
                                    >
                                        <div className="flex gap-2 sm:gap-3">
                                            <LucideIcons.AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5" />
                                            <p className="text-xs sm:text-sm text-slate-700">
                                                Send funds to the address above. After sending,
                                                please contact Nexxen support with the receipt &
                                                username for verification.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </div>
        </TabsContent>
    );
};

export default Index;
