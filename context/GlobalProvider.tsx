import { getWalletClient, WalletAppContext } from "../configs/wallet-config";
import { WagmiConfig } from "wagmi";
import {
  ConnectButton,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  SharedConfigContext,
  ArtivaContext,
  DefaultComponents,
  DefaultHooks,
} from "@artiva/shared";
import { SWRConfig } from "swr";
import axios from "axios";
import Image from "next/future/image";
import { ArtivaClientConfig } from "configs/artiva-client-config";
import ThemeContext, { ThemeCSSWrapper } from "./ThemeContext";

const GlobalProvider = ({ children }: { children: React.ReactChild }) => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { wagmiClient, chains } = getWalletClient(WalletAppContext.PLATFORM);

  return (
    <ThemeContext.Provider>
      <ThemeCSSWrapper>
        <WagmiConfig client={wagmiClient}>
          <SharedConfigContext.Provider value={{ ...ArtivaClientConfig }}>
            <SWRConfig value={{ fetcher, refreshInterval: 30000 }}>
              <RainbowKitProvider
                chains={chains}
                theme={lightTheme({
                  borderRadius: "medium",
                  fontStack: "system",
                  overlayBlur: "small",
                })}
              >
                <ArtivaContext.Provider
                  value={{
                    components: {
                      ...DefaultComponents,
                      ConnectButton: ConnectButton.Custom,
                      Image: Image,
                    },
                    hooks: DefaultHooks,
                  }}
                >
                  {children}
                </ArtivaContext.Provider>
              </RainbowKitProvider>
            </SWRConfig>
          </SharedConfigContext.Provider>
        </WagmiConfig>
      </ThemeCSSWrapper>
    </ThemeContext.Provider>
  );
};

export default GlobalProvider;
