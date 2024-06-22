import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: `${process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID!}`,
    dataset: 'production',
  },
})
