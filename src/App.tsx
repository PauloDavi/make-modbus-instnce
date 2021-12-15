import { ChakraProvider } from "@chakra-ui/react";
import { Form } from "./pages/Form";
import { customTheme } from "./styles/theme";

export function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <Form />
    </ChakraProvider>
  )
}
