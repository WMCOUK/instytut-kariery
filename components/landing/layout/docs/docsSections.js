
import ApiEndpoints from "@/components/landing/sections/docs/ApiEndpoints"
import Authentication from "@/components/landing/sections/docs/Authentication"
import BackupAndRestore from "@/components/landing/sections/docs/BackupAndRestore"
import Credits from "@/components/landing/sections/docs/Credits"
import DatabaseSchema from "@/components/landing/sections/docs/DatabaseSchema"
import EnvironmentVariables from "@/components/landing/sections/docs/EnvironmentVariables"
import Internationalization from "@/components/landing/sections/docs/Internationalization"
import { Introduction } from "@/components/landing/sections/docs/Introduction"
import KeyComponents from "@/components/landing/sections/docs/KeyComponents"
import KeyFeatures from "@/components/landing/sections/docs/KeyFeatures"
import PaymentIntegration from "@/components/landing/sections/docs/PaymentIntegration"
import ProjectStructure from "@/components/landing/sections/docs/ProjectStructure"
import PurposeAndScope from "@/components/landing/sections/docs/PurposeAndScope"
import SetupInstructions from "@/components/landing/sections/docs/SetupInstructions"
import Support from "@/components/landing/sections/docs/Support"
import TechnologyStack from "@/components/landing/sections/docs/TechnologyStack"
import TestingAndDebugging from "@/components/landing/sections/docs/TestingAndDebugging"

export const docsSections = [
	{ title: 'Introduction', slug: 'introduction', Component: Introduction },
	{ title: 'Purpose and Scope', slug: 'purpose-and-scope', Component: PurposeAndScope },
	{ title: 'Key Features', slug: 'key-features', Component: KeyFeatures },
	{ title: 'Technology Stack', slug: 'technology-stack', Component: TechnologyStack },
	{ title: 'Project Structure', slug: 'project-structure', Component: ProjectStructure },
	{ title: 'Setup Instructions', slug: 'setup-instructions', Component: SetupInstructions },
	{ title: 'Environment Variables', slug: 'environment-variables', Component: EnvironmentVariables },
	{ title: 'Database Schema', slug: 'database-schema', Component: DatabaseSchema },
	{ title: 'API Endpoints', slug: 'api-endpoints', Component: ApiEndpoints },
	{ title: 'Authentication', slug: 'authentication', Component: Authentication },
	{ title: 'Internationalization (i18n)', slug: 'internationalization', Component: Internationalization },
	{ title: 'Payment Integration', slug: 'payment-integration', Component: PaymentIntegration },
	{ title: 'Key Components', slug: 'key-components', Component: KeyComponents },
	{ title: 'Backup and Restore', slug: 'backup-and-restore', Component: BackupAndRestore },
	{ title: 'Testing and Debugging', slug: 'testing-and-debugging', Component: TestingAndDebugging },
	{ title: 'Support', slug: 'support', Component: Support },
	{ title: 'Credits', slug: 'credits', Component: Credits },
]
