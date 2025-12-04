import type { ReactNode } from 'react';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (value: any, item: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (id: number) => void;
  loading?: boolean;
}

function DataTable<T extends { id: number }>({
  data,
  columns,
  onEdit,
  onDelete,
  loading = false
}: DataTableProps<T>) {
  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)}>{column.header}</th>
            ))}
            {(onEdit || onDelete) && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="no-data">
                Nenhum registro encontrado
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                {columns.map((column) => (
                  <td key={String(column.key)}>
                    {column.render
                      ? column.render(item[column.key as keyof T], item)
                      : String(item[column.key as keyof T] || '')
                    }
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="actions">
                    {onEdit && (
                      <button
                        className="btn btn-edit"
                        onClick={() => onEdit(item)}
                      >
                        Editar
                      </button>
                    )}
                    {onDelete && (
                      <button
                        className="btn btn-delete"
                        onClick={() => onDelete(item.id)}
                      >
                        Excluir
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
