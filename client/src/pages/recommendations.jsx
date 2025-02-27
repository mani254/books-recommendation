import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "@/components/bookCard";
import Pagination from "@/components/pagination";
import { useRouter } from "next/router";

export default function Recommendations() {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [totalItems, setTotalItems] = useState(0);
	const router = useRouter();
	const searchParams = router.query;

	useEffect(() => {
		const fetchRecommendedBooks = async () => {
			try {
				setLoading(true);
				const response = await axios.get("http://localhost:8080/api/recommendations", { withCredentials: true });
				setBooks(response.data.recommendedBooks);
				setTotalItems(response.data.recommendedBooks.length);
			} catch (err) {
				setError("Failed to load recommended books. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchRecommendedBooks();
	}, []);

	const limit = parseInt(searchParams.limit, 10) || 10;

	if (loading)
		return (
			<div className="flex justify-center items-center h-40">
				<div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
				<p className="ml-3 text-gray-500 text-lg">Loading recommendations...</p>
			</div>
		);

	if (error)
		return (
			<div className="flex flex-col items-center justify-center h-40 bg-red-100 p-4 rounded-lg border border-red-300">
				<p className="text-red-600 text-lg font-semibold">⚠️ Error</p>
				<p className="text-red-500">{error}</p>
			</div>
		);

	return (
		<div className="p-6 max-w-6xl mx-auto rounded-lg overflow-hidden mt-2 bg-main">
			<h4 className="mb-5">Recommended Books 📖</h4>
			<div>
				{books.length === 0 ? (
					<p className="text-center text-gray-600">No recommendations available.</p>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{books.slice(0, limit).map((book) => (
							<BookCard key={book._id} book={book} />
						))}
					</div>
				)}

				{totalItems > limit && <Pagination totalItems={totalItems} />}
			</div>
		</div>
	);
}
