import { useState, useEffect } from "react";
import Loading from "./Loading";
import Profile from "./Profile";
import Search from './Search'
import Chart from "react-apexcharts";

// const singleUser = `https://api.github.com/users/DhananjayRakshe`
// const repos = `https://api.github.com/users/DhananjayRakshe/repos?per_page=5`
// https://api.github.com/users/DhananjayRakshe/repos?page=1&per_page=10&sort=updated

function App() {
	// Static Charts
	const [barChart, setBarChart] = useState(
		{
			options: {
				chart: {
					id: "basic-bar"
				},
				xaxis: {
					categories: ["May", "June", "July", "Sep", "Oct", "Nov", "Des"]
				}
			},
			series: [
				{
					name: "Open Issues",
					data: [30, 40, 45, 50, 49, 60, 70, 91]
				},
				{
					name: "Closed Issues",
					data: [29, 67, 34, 78, 12, 56, 34, 32]
				}
			]
		}
	);
	const [lineChart, setLineChart] = useState(
		{
			options: {
				chart: {
					id: "basic-bar"
				},
				xaxis: {
					categories: ["May", "June", "July", "Sep", "Oct", "Nov", "Des"]
				}
			},
			series: [{
				type: 'area',
				data: [30, 40, 45, 50, 49, 60, 70, 91]
			  }, {
				type: 'column',
				data: [29, 67, 34, 78, 12, 56, 34, 32]
			  }]
			  
		}
	);

	const [items, setItems] = useState([]);
	// By default user is DhananjayRakshe
	const [userName, setUserName] = useState("DhananjayRakshe");
	const [repoName, setRepoName] = useState("");
	const [matchedRepo, setMatchedRepo] = useState("");
	const [sortValue, setSortValue] = useState("");
	const [flag, setFlag] = useState(false);
	const sortOptions = ["stargazers_count", "watchers", "open_issues_count", "name", "created", "updated"];


	const fetchRepos = async () => {
		const res = await fetch(
			`https://api.github.com/users/${userName}/repos`
		);
		const data = await res.json();
		setItems(data);
	};

	useEffect(() => {
		fetchRepos();
		// handleRepoSearch();
	}, [userName]);

	const handleReset = () => {
		fetchRepos();
		setUserName("");
		setRepoName("");
		setMatchedRepo("");
	};

	const handelUserName = async (e) => {
		e.preventDefault();
		setUserName(e.target.value);
	};

	const handelRepoName = async (e) => {
		e.preventDefault();
		setRepoName(e.target.value);
	};

	const repoNameArray = [];
	for (let i = 0; i < items.length; i++) {
		repoNameArray.push(items[i].name)
	}
	// console.log("Array of repo name", repoNameArray);
	const handleRepoSearch = () => {
		for (let i = 0; i < repoNameArray.length; i++) {
			// console.log("for loop working");
			if (repoName === repoNameArray[i]) {
				// console.log("Match Find Succesfully", repoNameArray[i]);
				setMatchedRepo(repoName);
				setFlag(true);
			}
		}
	}

	const handleSort = async (e) => {
		let value = e.target.value;
		setSortValue(value);
		const res = await fetch(
			`https://api.github.com/users/${userName}/repos?sort=${value}&order=asc`
		);
		const data = await res.json();
		setItems(data);

	}



	return (
		<>
			<div className="pt-10 flex justify-center">
				<h1 className="mb-10 font-bold text-2xl">
					{userName ? `Viewing ${userName}'s Repos` : "Welcome to Git Search"}
				</h1>
			</div>
			{/* Form for search user */}
			<div className="flex justify-center mb-5" style={{ gap: "10px" }}>
				<section
					className="flex justify-center"
					style={{
						display: "flex",
						flexDirection: "row",
						alignContent: "center",
						alignItems: "center",
						width: "80%",
						gap: "30px",
					}}
				>
					<div>
						<input
							type="text"
							className="form-control mb-2 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							id="UserNameField"
							placeholder="Enter Github username"
							value={userName}
							defaultValue=""
							onChange={handelUserName}
						/>
						<select className="mb-2 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" onChange={handleSort} value={sortValue}>
							<option>Please Select Value</option>
							{
								sortOptions.map((item, index) => (
									<option value={item} key={index}>
										{item}
									</option>
								))
							}
						</select>
					</div>

					<div >
						<input
							type="text"
							className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							id="RepoNameField"
							placeholder="Search Repo (e.g scss)"
							value={repoName}
							defaultValue=""
							onInput={handelRepoName}
						/>
						<div className="flex justify-between">
							<button onClick={handleRepoSearch} className=" mb-2 xl:w-50  text-base mt-1  bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded">
								Search
							</button>
							<button
								onClick={handleReset}
								className=" mb-2 xl:w-50 text-base mt-1  bg-red-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
							>
								Reset
							</button>
						</div>
					</div>




				</section>

			</div>

			{items.length > 0 && flag === true ? <div className=" grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 pb-20">
				{items.filter(function (item) { return item.name === matchedRepo }).map((item) => (
					<Search key={item.id} searchString={repoName} {...item} />
				))}
			</div> :
				items.length === 0 ? (
					<Loading />
				) : items === [] ? (
					<Loading />
				) : userName === "" ? (
					<div className="font-bold text-3xl flex justify-center">
						<h1 className="mb-10 font-bold text-2xl">Enter User Name First...</h1>
					</div>
				) : items.length > 0 ? (
					<div className=" grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 pb-20">
						{items.map((item) => (
							<Profile key={item.id} searchString={repoName} {...item} />
						))}
					</div>
				) : (
					<Loading />
				)}

			<div>
				<center><h2 className="mb-10 font-bold text-2xl">Static Chart</h2></center>
				<div className="flex justify-evenly">
					<Chart
						options={barChart.options}
						series={barChart.series}
						type="bar"
						width="500"
					/>
					<Chart
						options={lineChart.options}
						series={lineChart.series}
						type="line"
						width="500"
					/>
				</div>
			</div>
		</>
	);
}

export default App;
