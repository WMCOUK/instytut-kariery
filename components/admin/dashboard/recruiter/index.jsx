// import CompleteRecruiterProfileBanner from "./CompleteRecruiterProfileBanner"
import JobListings from "./JobListings"
// import RecentPosts from "./RecentPosts"
import RecruiterJobChart from "./RecruiterJobChart"
import RecruiterProfileCard from "./RecruiterProfileCard"
import RecruiterStats from "./RecruiterStats"

export default function RecruiterDashboard() {
	return (
		<>
			<RecruiterStats />
			<RecruiterJobChart />
			<RecruiterProfileCard />
			{/* <CompleteRecruiterProfileBanner /> */}
			<JobListings />
			{/* <RecentPosts /> */}
		</>
	)
}
