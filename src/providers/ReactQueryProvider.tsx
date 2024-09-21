import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import React from "react";
import { toast } from "react-toastify";

const ReactQueryProvider = ({ 
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => { 
        const isAxiosError = error.name === "AxiosError";
        if (isAxiosError) {
          const axiosError = error as unknown as AxiosError<any>;
          toast.error(axiosError.response?.data.error.description);
          return;
        }
        toast.error(error.message);
      },
    }),
  });
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;