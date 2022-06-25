import { Framework } from "@superfluid-finance/sdk-core";
import { useEthers } from "@usedapp/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { ActiveChain } from "../settings";

type Paging = { take: number; skip?: number; lastId?: string };

export const useSuperfluid = async () => {
  const { library: provider } = useEthers();

  const sf = await Framework.create({
    networkName: ActiveChain.networkName,
    provider,
  });

  return sf;
};

interface UseSuperfluidQueryProps<T> {
  query: (sf: Framework) => Promise<T>;
  enabled?: boolean;
}

export const useSuperfluidQuery = <T>({
  query,
  enabled = true,
}: UseSuperfluidQueryProps<T>) => {
  const { library: provider } = useEthers();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (enabled) {
      const trigger = async () => {
        const sf = await Framework.create({
          networkName: ActiveChain.networkName,
          provider,
        });
        setIsLoading(true);
        setResult(null);
        setError(null);

        try {
          const result = await query(sf);
          setResult(result);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };

      trigger();
    }
  }, [enabled]);

  return { isLoading, result, error };
};
