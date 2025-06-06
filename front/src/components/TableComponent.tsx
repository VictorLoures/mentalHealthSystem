import {
  ActionIcon,
  Button,
  Group,
  Pagination,
  Table,
  TextInput,
} from "@mantine/core";
import {
  IconArrowsSort,
  IconPencil,
  IconSearch,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
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

const pageSize = 8;

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
  const [filterData, setFilterData] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (data) {
      setFilterData(data);
      setCurrentPage(1);
    }
  }, [data]);

  const getPaginedData = () => {
    return filterData?.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  };

  function getFieldValue(it: any, field: any) {
    return field.split(".").reduce((acc: any, chave: any) => acc?.[chave], it);
  }

  const onChangeFilter = (event: any) => {
    if (event && event.target.value !== "" && data) {
      const valueSearch = event.target.value;
      setSearch(valueSearch);
      const dataFilter = data.filter((it) => {
        const values: any[] = [];
        columns?.forEach((column) => {
          let fieldValue = getFieldValue(it, column.field);
          if (typeof fieldValue === "boolean") {
            fieldValue = fieldValue ? "Sim" : "Não";
          }
          values.push(fieldValue);
        });
        return values.some((val) =>
          val?.toString().toLowerCase().includes(valueSearch.toLowerCase())
        );
      });
      setFilterData(dataFilter);
      setCurrentPage(1);
    } else {
      setSearch("");
      setFilterData(data || []);
      setCurrentPage(1);
    }
  };

  const getCleanSearchIcon = () => {
    if (search) {
      return (
        <IconX
          size={18}
          color="red"
          style={{ cursor: "pointer" }}
          onClick={() => onChangeFilter(null)}
        />
      );
    } else {
      return null;
    }
  };

  const sortColumn = (field: any) => {
    const sorted = [...filterData].sort((a: any, b: any) => {
      let aVal = getFieldValue(a, field);
      let bVal = getFieldValue(b, field);

      if (!isNaN(Number(aVal)) && !isNaN(Number(bVal))) {
        aVal = Number(aVal);
        bVal = Number(bVal);
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setFilterData(sorted);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setCurrentPage(1);
  };

  return (
    <>
      <h3 style={{ margin: "15px" }}>{title}</h3>
      <div className="header-div">
        {!isDashboard && (
          <>
            <TextInput
              withAsterisk
              label={null}
              placeholder="Refine sua busca..."
              value={search}
              leftSection={<IconSearch size={18} />}
              rightSection={<>{getCleanSearchIcon()}</>}
              maxLength={150}
              onChange={onChangeFilter}
              style={{ width: "30vw" }}
            />
            <Group justify="flex-end" mt="md">
              <Button color="red" onClick={() => navigate("/")}>
                Fechar
              </Button>
              <Button color="green" onClick={() => navigate(createView)}>
                Incluir
              </Button>
            </Group>
          </>
        )}
      </div>
      {filterData && filterData.length > 0 && (
        <>
          <Table>
            <Table.Thead>
              <Table.Tr>
                {columns?.map((column) => (
                  <Table.Th>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0 5px",
                      }}
                    >
                      {column.label}{" "}
                      <IconArrowsSort
                        size={14}
                        style={{ cursor: "pointer" }}
                        onClick={() => sortColumn(column.field)}
                      />
                    </div>
                  </Table.Th>
                ))}
                <Table.Th>Ações</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {getPaginedData().map((it: any) => {
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
          <Group justify="center" mt="md">
            <Pagination
              value={currentPage}
              onChange={setCurrentPage}
              total={Math.ceil(filterData.length / pageSize)}
            />
          </Group>
        </>
      )}
      {!filterData ||
        (filterData.length <= 0 && (
          <h3 style={{ display: "flex", justifyContent: "center" }}>
            {msgNoData}
          </h3>
        ))}
    </>
  );
};

export default TableComponent;
