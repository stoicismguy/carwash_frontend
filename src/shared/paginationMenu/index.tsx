import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui";


interface IProps {
    current: number;
    total: number;
    fetch: (page?: number, inputValue?: string) => Promise<void>;
    inputValue?: string
  }
  
  
const PaginationMenu = ({ current, total, fetch, inputValue }: IProps) => {
    const getPageNumbers = () => {
        const pages = [];
        const delta = 2; 
    
        const start = Math.max(2, current - delta); 
        const end = Math.min(total - 1, current + delta); 
    
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
                    <PaginationPrevious onClick={() => fetch(current - 1, inputValue)} />
                </PaginationItem>
            )}
    
            {/* Первая страница */}
            <PaginationItem>
                <PaginationLink isActive={current === 1} onClick={() => fetch(1, inputValue)}>1</PaginationLink>
            </PaginationItem>
    
            {/* Многоточие перед основным блоком */}
            {start > 2 && <PaginationEllipsis />}
    
            {/* Основные страницы */}
            {pages.map((page) => (
                <PaginationItem key={page}>
                <PaginationLink isActive={page === current} onClick={() => fetch(page, inputValue)}>
                    {page}
                </PaginationLink>
                </PaginationItem>
            ))}
    
            {/* Многоточие после основного блока */}
            {end < total - 1 && <PaginationEllipsis />}
    
            {/* Последняя страница */}
            {total > 1 && (
                <PaginationItem>
                <PaginationLink isActive={current === total} onClick={() => fetch(total, inputValue)}>
                    {total}
                </PaginationLink>
                </PaginationItem>
            )}
    
            {/* Кнопка "Следующая" */}
            {current < total && (
                <PaginationItem>
                <PaginationNext onClick={() => fetch(current + 1, inputValue)} />
                </PaginationItem>
            )}
            </PaginationContent>
        </Pagination>
    );
  };
  
  
export default PaginationMenu;