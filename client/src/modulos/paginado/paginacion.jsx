import { useState } from 'react';

export default function Paginacion({ options, paginate, handlePageClick }) {
    const [pagina_actual, setCurrentPage] = useState(1);
    const total_paginas = Math.ceil(options.cantidad / paginate.espacio);
    const [divisor,setDivisor] = useState(true)
    const handlePrevClick = () => {
        if (pagina_actual > 1) {
            setCurrentPage(pagina_actual - 1);
            handlePageClick({ selected: pagina_actual - 2 }); 
        }
    };

    const handleNextClick = () => {
        if (pagina_actual < total_paginas) {
            setCurrentPage(pagina_actual + 1);
            handlePageClick({ selected: pagina_actual }); 
        }
    };

    const handlePageNumberClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        handlePageClick({ selected: pageNumber - 1 }); 
    };

    const secciones_navegacion = () => {
        const pageNumbers = [];
        for (let i = 1; i <= total_paginas; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };
    function render_numbers(number) {
        if(number < (pagina_actual -2) || number > (pagina_actual +2 )) {
         if (divisor) {
            setDivisor(false);
            return  <div>{"..."}</div>
         } 
        }else {

      return ( <li
            key={number}
            className={`page-item ${pagina_actual === number ? 'selected' : ''}`}
        >
            <button className="page-link" onClick={() => handlePageNumberClick(number)}>
                {number}
            </button>
        </li>)
        }

    }
    return (
        <div className="navigation">
            <ul className="pagination">
                <li className={`page-item ${pagina_actual === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={handlePrevClick}>
                        &lt; Anterior
                    </button>
                </li>
                {secciones_navegacion().map((pageNumber) => {return render_numbers(pageNumber)}
            )}
                <li className={`page-item ${pagina_actual === total_paginas ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={handleNextClick}>
                        Siguiente &gt;
                    </button>
                </li>
            </ul>
        </div>
    );
}