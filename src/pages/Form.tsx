import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  SimpleGrid,
  HStack,
  VStack,
  Flex
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { InputRhf } from "../components/Input";
import { NumberInputRhf } from "../components/NumberInput";
import { SlugInputRhf } from "../components/SlugInput";
import { useState } from "react";
import { ModbusTable, Data } from "../components/ModbusTable";

export interface DataProps {
  name: string;
  Configs: {
    modbusIP: string;
    influxIP: string;
    influxDatabase: string;
    influxTable: string;
    delay: string;
  }
  modbus: Data[]
}

export function Form() {
  const methods = useForm();
  const [modbusOperationsKey, setModbusOperationsKey] = useState('')
  const [modbusOperationsValue, setModbusOperationsValue] = useState('')

  const onSubmit = ({name, Configs: data, modbus}: DataProps) => {
    window.Main.saveIni({
      name,
      Configs: {
        ...data,
        delay: `${data.delay}s`
      },
      Modbus: modbus.reduce((obj, item) => {
        return {
          ...obj,
          [item.key]: item.value,
        };
      }, {})
    });
  };

  const { fields, remove, append } = useFieldArray({
    control: methods.control,
    name: "modbus"
  });

  return (
    <Box p={4}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <SimpleGrid spacing="4" columns={[1, 2]}>
            <SlugInputRhf
              options={{
                required: "O nome da conexão é obrigatorio"
              }}
              name="name"
              label="Nome da conexão *"
            />

            <InputRhf
              options={{
                required: "O IP do equipamento é obrigatorio",
                pattern: {
                  value: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):(6553[0-5]|655[0-2][0-9]|65[0-4][0-9][0-9]|6[0-4][0-9][0-9][0-9][0-9]|[1-5](\d){4}|[1-9](\d){0,3})$/,
                  message: "IP do equipamento inválido"
                }
              }}
              placeholder="127.0.0.1:502"
              name="Configs.modbusIP"
              label="IP do equipamento a ser conectado (MODBUS) *"
            />

            <InputRhf
              options={{
                required: "O IP do banco de dados é obrigatorio",
                pattern: {
                  value: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):(6553[0-5]|655[0-2][0-9]|65[0-4][0-9][0-9]|6[0-4][0-9][0-9][0-9][0-9]|[1-5](\d){4}|[1-9](\d){0,3})$/,
                  message: "IP do banco de dados inválido *"
                }
              }}
              placeholder="127.0.0.1:8086"
              name="Configs.influxIP"
              label="IP do banco de dados (InfluxDB) *"
            />

            <InputRhf
              options={{
                required: "O nome do banco de dados é obrigatorio"
              }}
              name="Configs.influxDatabase"
              label="Nome do banco de dados (InfluxDB) *"
            />

            <InputRhf
              options={{
                required: "O nome da tabela do banco de dados é obrigatorio"
              }}
              name="Configs.influxTable"
              label="Especifique a tabela do banco de dados (InfluxDB) *"
            />

            <NumberInputRhf
              min={0}
              defaultValue={0}
              name="Configs.delay"
              label="Delay entre requisições (segundos)"
            />
          </SimpleGrid>

          <VStack spacing="4" mx="auto" maxWidth="xl">
            <Flex direction={["column", "row"]} gap="4" mt={4} justifyContent="center" alignItem="center" width="full">
              <FormControl flex={1}>
                <FormLabel htmlFor="modbusOperationsKey">Chave da operação</FormLabel>
                <Input
                  name="modbusOperationsKey"
                  value={modbusOperationsKey}
                  onChange={(e) => setModbusOperationsKey(e.target.value)}
                />
              </FormControl>

              <FormControl flex={1}>
                <FormLabel htmlFor="modbusOperationsValue">Valor da operação (RPN)</FormLabel>
                <Input
                  name="modbusOperationsValue"
                  value={modbusOperationsValue}
                  onChange={(e) => setModbusOperationsValue(e.target.value)}
                />
              </FormControl>
            </Flex>

            <Button
              leftIcon={<AddIcon />}
              colorScheme="blue"
              onClick={() => {
                append({ key: modbusOperationsKey, value: modbusOperationsValue })
                setModbusOperationsKey('')
                setModbusOperationsValue('')
              }}
              isFullWidth
              disabled={modbusOperationsKey === '' || modbusOperationsValue === ''}
              type="button"
            >
              Adicionar Operação
            </Button>
          </VStack>


          {
            fields && fields.length > 0 && (
              <Box boxShadow="lg" mt={4} borderRadius={8} borderColor="gray.300" borderWidth={1} mx="auto" maxWidth="xl">
                <ModbusTable data={fields as any} remove={remove} />
              </Box>
            )
          }

          <HStack spacing="4" mt={4}>
            <Button onClick={window.Main.openIni} w="full" colorScheme="teal" type="button">
              Abrir
            </Button>

            <Button w="full"colorScheme="teal" isLoading={methods.formState.isSubmitting} type="submit">
              Salvar
            </Button>
          </HStack>
        </form>
      </FormProvider>
    </Box>
  )
}
