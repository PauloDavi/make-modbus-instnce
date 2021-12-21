import { useMemo } from "react"
import { Table, Thead, Tbody, Tr, Th, Td, IconButton, Tooltip } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

export interface Data {
  id: string;
  key: string;
  value: string;
}

interface ModbusTableProps {
  data: Data[];
  remove: (index?: number | number[] | undefined) => void
}

export function ModbusTable({ data, remove }: ModbusTableProps) {
  const columns = useMemo(
    () => [
      {
        Header: 'Chave',
        accessor: 'key',
      },
      {
        Header: 'Valor',
        accessor: 'value',
      },
    ],
    [],
  )

  return (
    <Table>
      <Thead>
        <Tr>
          {columns.map(({ Header }) => (
            <Th key={Header}>
              {Header}
            </Th>
          ))}

          <Th isNumeric>Ações</Th>
        </Tr>
      </Thead>

      <Tbody>
        {data.map((row, index) => (
          <Tr>
            {columns.map(({ accessor }) => (
              <Td key={accessor}>
                {row[accessor as 'key' | 'value']}
              </Td>
            ))}

            <Td isNumeric>
              <Tooltip label="Deletar" hasArrow>
                <IconButton
                  colorScheme='blue'
                  aria-label='delete'
                  onClick={() => remove(index)}
                  icon={<DeleteIcon />}
                />
              </Tooltip>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
