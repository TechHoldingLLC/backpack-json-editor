import { useState } from 'react'
import FileUpload from './components/FileUpload'
import LeagueCard from './components/LeagueCard'
import TeamFlow from './components/TeamFlow'
import { SaveJsonButton } from './components/SaveJsonButton'
import { SaveTeamJsonButton } from './components/SaveTeamJsonButton'
import { ValidationErrors } from './components/ValidationErrors'
import type { ExtendedTeam } from './components/team/types'

// Basic interfaces for League data
interface BasicTeam {
  id: string
  logo_image: string
  enabled: boolean
}

interface League {
  id: string
  logo_image: string
  enabled: boolean
  teams: BasicTeam[]
}

interface LeagueData {
  leagues: League[]
}

interface ValidationError {
  path: string
  message: string
}

type TabType = 'leagues' | 'teams'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('leagues')
  const [leagueData, setLeagueData] = useState<LeagueData | null>(null)
  const [teamData, setTeamData] = useState<ExtendedTeam | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])

  const handleFileUpload = (data: LeagueData | ExtendedTeam) => {
    if ('leagues' in data) {
      setLeagueData(data as LeagueData)
      setTeamData(null)
    } else {
      setTeamData(data as ExtendedTeam)
      setLeagueData(null)
    }
    setError(null)
    setValidationErrors([])
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

  const handleTeamUpdate = (updatedTeam: ExtendedTeam) => {
    setTeamData(updatedTeam)
  }

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
    setError(null)
    setValidationErrors([])
  }

  const handleSaveLeagueJson = () => {
    const blob = new Blob([JSON.stringify({ leagues: leagueData }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'leagues.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSaveTeamJson = () => {
    const blob = new Blob([JSON.stringify(teamData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'team.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleValidationError = (errors: ValidationError[]) => {
    setValidationErrors(errors)
    setTimeout(() => setValidationErrors([]), 5000)
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
            <div className="flex justify-end">
              <SaveJsonButton
                data={leagueData.leagues}
                onSave={handleSaveLeagueJson}
                onValidationError={handleValidationError}
              />
            </div>
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
          <div className="space-y-4">
            <div className="flex justify-end mb-4">
              <SaveTeamJsonButton
                data={teamData}
                onSave={handleSaveTeamJson}
                onValidationError={handleValidationError}
              />
            </div>
            <TeamFlow
              initialTeam={teamData}
              onTeamUpdate={handleTeamUpdate}
            />
          </div>
        )}

        <ValidationErrors
          errors={validationErrors}
          onDismiss={() => setValidationErrors([])}
        />
      </div>
    </div>
  )
}

export default App
