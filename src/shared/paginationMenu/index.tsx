import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui";


interface IProps {
    current: number;
    total: number;
  }
  
  interface IProps {
    current: number;
    total: number;
  }
  
  const PaginationMenu = ({ current, total }: IProps) => {
    const getPageNumbers = () => {
      const pages = [];
      const delta = 2; // Показываем по 2 страницы слева и справа от текущей
  
      const start = Math.max(2, current - delta); // Начинаем с 2, т.к. 1 всегда отдельно
      const end = Math.min(total - 1, current + delta); // До предпоследней, т.к. total отдельно
  
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
  
      return { pages, start, end };
    };
  
    const { pages, start, end } = getPageNumbers();
  
    return (
      <Pagination>
        <PaginationContent>
          {/* Кнопка "Предыдущая" */}
          {current > 1 && (
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>
          )}
  
          {/* Первая страница */}
          <PaginationItem>
            <PaginationLink isActive={current === 1}>1</PaginationLink>
          </PaginationItem>
  
          {/* Многоточие перед основным блоком */}
          {start > 2 && <PaginationEllipsis />}
  
          {/* Основные страницы */}
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink isActive={page === current}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
  
          {/* Многоточие после основного блока */}
          {end < total - 1 && <PaginationEllipsis />}
  
          {/* Последняя страница */}
          {total > 1 && (
            <PaginationItem>
              <PaginationLink isActive={current === total}>
                {total}
              </PaginationLink>
            </PaginationItem>
          )}
  
          {/* Кнопка "Следующая" */}
          {current < total && (
            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    );
  };
  
  
export default PaginationMenu;