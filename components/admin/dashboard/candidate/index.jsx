
import AppliedJob from "./AppliedJob"
import ProfileCard from "./CandidateProfileCard"
import JobStats from "./CandidateStats"
// import NotificationProfileBanner from "./CompleteCandidateProfileBanner"
// import RecentPosts from "./RecentPosts"

export default function CandidateDashboard() {
	return (
		<>
			<JobStats />
			<ProfileCard />
			{/* <NotificationProfileBanner /> */}
			{/* <RecentPosts /> */}
			<AppliedJob />
		</>
	)
}
