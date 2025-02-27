import Link from "next/link";
import { useRouter } from "next/router";

const RecommendationsIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
		<path d="M232,96a7.89,7.89,0,0,0-.3-2.2L217.35,43.6A16.07,16.07,0,0,0,202,32H54A16.07,16.07,0,0,0,38.65,43.6L24.31,93.8A7.89,7.89,0,0,0,24,96v16a40,40,0,0,0,16,32v64a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V144a40,40,0,0,0,16-32ZM54,48H202l11.42,40H42.61Z"></path>
	</svg>
);

const BooksIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
		<path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15Z"></path>
	</svg>
);

const AddBookIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
		<path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
	</svg>
);

const navItems = [
	{ label: "Recommendations", icon: RecommendationsIcon, link: "/recommendations" },
	{ label: "Books", icon: BooksIcon, link: "/books" },
	{ label: "Add Book", icon: AddBookIcon, link: "/books/add" },
];

function Navbar() {
	const router = useRouter();

	return (
		<div className="layout-content-container flex flex-col xl:min-w-[260px]">
			<div className="flex h-screen flex-col justify-between bg-main p-4 rounded-tr-xl rounded-br-xl sticky top-0">
				<div className="flex flex-col gap-2">
					<div className="flex px-2">
						<h4 className="text-lg font-bold mt-1 tracking-wide bg-gradient-to-br from-blue-500 to-purple-500 text-transparent bg-clip-text hidden lg:block">Books App</h4>
					</div>
					<div className="w-full h-[2px] rounded-full bg-main-2"></div>
					{navItems.map(({ label, icon: Icon, link }) => (
						<div className="tooltip inline-block" data-tooltip={label} key={label}>
							<Link href={link} className={`flex items-center gap-3 px-3 py-[6px] rounded-xl ${router.pathname === link ? "bg-main-3 text-primary" : "hover:bg-main-2"} transition-colors font-medium`} role="menuitem" aria-label={label}>
								<Icon />
								<p className="text-xs hidden lg:block">{label}</p>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Navbar;
