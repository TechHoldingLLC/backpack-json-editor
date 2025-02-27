import { useState } from 'react'
import FileUpload from './components/FileUpload'
import LeagueCard from './components/LeagueCard'
import TeamFlow from './components/TeamFlow'

interface Team {
  id: string
  logo_image: string
  enabled: boolean
}

interface League {
  id: string
  logo_image: string
  enabled: boolean
  teams: Team[]
}

interface LeagueData {
  leagues: League[]
}

interface TeamData {
  id: string
  name: string
  logo_image: string
  survey_url: string
  welcome_details: {
    title: string
    description: string
    welcome_image: string
    author: string
  }
  enabled: boolean
  team_home: {
    motto: string
    best_ideas: {
      user_name: string
      user_image: string
    }
    most_missions: {
      user_name: string
      user_image: string
    }
    top_team_rank: Array<{
      user_name: string
      user_image: string
    }>
  }
  missions: Array<{
    id: string
    title: string
    description: string
    image: string
    focus_type: string
    level: string
    completion_msg: string
    completion_image: string
    questions: Array<{
      question_type: string
      question: string
      options?: string[]
      video?: string
      allow_multiple_selection: boolean
      options_title_left?: string
      options_title_right?: string
      option_image?: string
      image_option_hint?: string
      dropdown_options?: Array<{
        title: string
        hint: string
        options: string[]
      }>
      image_selection?: Array<{
        title: string
        image: string
      }>
    }>
  }>
  ideas: {
    default_youtube_thumbnail_image: string
    menu_list: {
      review_title: string
      review_description: string
      select_title: string
      select_description: string
      submit_title: string
      submit_description: string
    }
    play_ideas: string[]
    review_idea: {
      id: string
      title: string
      description: string
      image: string
      completion_msg: string
      completion_image: string
      questions: Array<{
        question_type: string
        question: string
        options?: string[]
        video?: string
        allow_multiple_selection: boolean
        options_title_left?: string
        options_title_right?: string
        option_image?: string
        image_option_hint?: string
        dropdown_options?: Array<{
          title: string
          hint: string
          options: string[]
        }>
        image_selection?: Array<{
          title: string
          image: string
        }>
      }>
    }
    select_idea: {
      id: string
      title: string
      description: string
      image: string
      completion_msg: string
      completion_image: string
      questions: Array<{
        question_type: string
        question: string
        options?: string[]
        video?: string
        allow_multiple_selection: boolean
        options_title_left?: string
        options_title_right?: string
        option_image?: string
        image_option_hint?: string
        dropdown_options?: Array<{
          title: string
          hint: string
          options: string[]
        }>
        image_selection?: Array<{
          title: string
          image: string
        }>
      }>
    }
    submit_idea: {
      id: string
      title: string
      description: string
      image: string
    }
  }
}

type TabType = 'leagues' | 'teams'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('leagues')
  const [leagueData, setLeagueData] = useState<LeagueData | null>(null)
  const [teamData, setTeamData] = useState<TeamData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = (data: LeagueData | TeamData) => {
    if ('leagues' in data) {
      setLeagueData(data as LeagueData)
      setTeamData(null)
    } else {
      setTeamData(data as TeamData)
      setLeagueData(null)
    }
    setError(null)
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
  }

  const handleLeagueUpdate = (updatedLeague: League) => {
    if (!leagueData) return

    const updatedLeagues = leagueData.leagues.map((league) =>
      league.id === updatedLeague.id ? updatedLeague : league
    )

    setLeagueData({
      ...leagueData,
      leagues: updatedLeagues,
    })
  }

  const handleTeamUpdate = (updatedTeam: TeamData) => {
    setTeamData(updatedTeam)
  }

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => handleTabChange('leagues')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'leagues'
                  ? 'bg-primary text-text-light'
                  : 'text-text hover:bg-gray-100'
              }`}
            >
              Leagues
            </button>
            <button
              onClick={() => handleTabChange('teams')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'teams'
                  ? 'bg-primary text-text-light'
                  : 'text-text hover:bg-gray-100'
              }`}
            >
              Teams
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {activeTab === 'leagues' && !leagueData && (
          <FileUpload
            type="league"
            onFileUpload={handleFileUpload}
            onError={handleError}
          />
        )}

        {activeTab === 'teams' && !teamData && (
          <FileUpload
            type="team"
            onFileUpload={handleFileUpload}
            onError={handleError}
          />
        )}

        {activeTab === 'leagues' && leagueData && (
          <div className="space-y-6">
            {leagueData.leagues.map((league) => (
              <LeagueCard
                key={league.id}
                league={league}
                onUpdate={handleLeagueUpdate}
              />
            ))}
          </div>
        )}

        {activeTab === 'teams' && teamData && (
          <TeamFlow
            initialTeam={teamData}
            onTeamUpdate={handleTeamUpdate}
          />
        )}
      </div>
    </div>
  )
}

export default App
