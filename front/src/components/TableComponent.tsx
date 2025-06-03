import { ActionIcon, Button, Group, Table } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface TableComponentProps {
  title?: string;
  createView: string;
  data?: any[];
  columns?: any[];
  isDashboard?: boolean;
  dashboardContentFn?: (obj: any) => any;
  updateFn: (id: any) => void;
  deleteFn?: (id: any) => void;
  msgNoData?: string;
}

const TableComponent = ({
  title,
  createView,
  data,
  columns,
  isDashboard,
  dashboardContentFn,
  updateFn,
  deleteFn,
  msgNoData,
}: TableComponentProps) => {
  const navigate = useNavigate();

  function getFieldValue(it: any, field: any) {
    return field.split(".").reduce((acc: any, chave: any) => acc?.[chave], it);
  }

  return (
    <>
      <div className="header-div">
        <h3>{title}</h3>
        {!isDashboard && (
          <Group justify="flex-end" mt="md">
            <Button color="red" onClick={() => navigate("/")}>
              Fechar
            </Button>
            <Button color="green" onClick={() => navigate(createView)}>
              Incluir
            </Button>
          </Group>
        )}
      </div>
      {data && data.length > 0 && (
        <Table>
          <Table.Thead>
            <Table.Tr>
              {columns?.map((column) => (
                <Table.Th>{column.label}</Table.Th>
              ))}
              <Table.Th>Ações</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((it: any) => {
              return (
                <Table.Tr key={it.id}>
                  {columns?.map((column) => {
                    if (column.fnFmt) {
                      return (
                        <Table.Td>
                          {column.fnFmt(getFieldValue(it, column.field))}
                        </Table.Td>
                      );
                    } else {
                      return (
                        <Table.Td>{getFieldValue(it, column.field)}</Table.Td>
                      );
                    }
                  })}
                  <Table.Td>
                    {isDashboard && dashboardContentFn ? (
                      <>{dashboardContentFn(it)}</>
                    ) : (
                      <div style={{ display: "flex", gap: "5px" }}>
                        <ActionIcon
                          variant="filled"
                          color="blue"
                          aria-label="Editar"
                        >
                          <IconPencil
                            style={{ width: "70%", height: "70%" }}
                            stroke={1.5}
                            onClick={() => updateFn(it.id)}
                          />
                        </ActionIcon>
                        {deleteFn && (
                          <ActionIcon
                            variant="filled"
                            color="red"
                            aria-label="Excluir"
                          >
                            <IconTrash
                              style={{ width: "70%", height: "70%" }}
                              stroke={1.5}
                              onClick={() => deleteFn(it.id)}
                            />
                          </ActionIcon>
                        )}
                      </div>
                    )}
                  </Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      )}
      {!data || (data.length <= 0 && <h3>{msgNoData}</h3>)}
    </>
  );
};

export default TableComponent;
