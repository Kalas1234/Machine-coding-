import { useEffect, useState } from 'react';

const Pagination = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const fetchProducts = async () => {
        const res = await fetch(`https://dummyjson.com/products?limit=10&&skip=${page * 10 - 10}`);
        const data = await res.json();
        if (data && data.products) {
            setTotalPage(Math.ceil(data.total / 10));
            setProducts(data?.products);
            console.log(data);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page]);
 
    const selectPageHandler = (selectedPage) => {
        if (selectedPage >= 1 && selectedPage <= totalPage && selectedPage !== page) {
            setPage(selectedPage);
        }
    };
    return (
        <div className="App">
            {products.length && (
                <div className="m-2 p-2 grid grid-cols-3 gap-5">
                    {products.map((prod) => {
                        return (
                            <div
                                className="p-[20px] bg-gray-200 text-center h-[350px] w-[300px] shadow-lg rounded-md cursor-pointer"
                                key={prod.id}>
                                <img className="w-full h-5/6" src={prod.thumbnail} alt={prod.title}></img>
                                <span className="text-xl font-bold">{prod.title}</span>
                            </div>
                        );
                    })}
                </div>
            )}
            {products.length && (
                <div className="flex justify-center">
                    <span
                        onClick={() => {
                            selectPageHandler(page - 1);
                        }}
                        className={page > 1 ? 'border border-black m-2 px-4 py-2 bg-slate-100' : 'opacity-0'}>
                        ◀️
                    </span>
                    {[...Array(totalPage)].map((_, i) => {
                        return (
                            <span
                                onClick={() => {
                                    selectPageHandler(i + 1);
                                }}
                                className={
                                    page === i + 1
                                        ? 'bg-slate-300 border m-2 px-4 py-2 border-black hover:bg-slate-500 cursor-pointer'
                                        : 'bg-slate-100 border m-2 px-4 py-2 border-black cursor-pointer'
                                }
                                key={i}>
                                {i + 1}
                            </span>
                        );
                    })}
                    <span
                        onClick={() => {
                            selectPageHandler(page + 1);
                        }}
                        className={page < totalPage ? 'border border-black m-2 px-4 py-2 bg-slate-100' : 'opacity-0'}>
                        ▶️
                    </span>
                </div>
            )}
        </div>
    );
};

export default Pagination;
