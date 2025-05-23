import { useState } from 'react'
import FileUpload from './components/FileUpload'
import CollapsibleLeagueCard from './components/CollapsibleLeagueCard'
import TeamFlow from './components/TeamFlow'
import { SaveJsonButton } from './components/SaveJsonButton'
import { SaveTeamJsonButton } from './components/SaveTeamJsonButton'
import { ValidationErrors } from './components/ValidationErrors'
import type { ExtendedTeam } from './components/team/types'
import { Header } from './components/Header'
import { AddLeagueButton } from './components/AddLeagueButton'

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

  const handleLeagueUpdate = (updatedLeague: League, index: number) => {
    if (!leagueData) return

    const updatedLeagues = [...leagueData.leagues];
    updatedLeagues[index] = updatedLeague;

    setLeagueData({
      ...leagueData,
      leagues: updatedLeagues,
    })
  }

  const handleDeleteLeague = (leagueId: string) => {
    if (!leagueData) return

    // Filter out the league with the matching ID
    const updatedLeagues = leagueData.leagues.filter(league => league.id !== leagueId);
    
    // Update the state with the new leagues array
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
    // Save with the correct structure matching league.json
    const blob = new Blob([JSON.stringify(leagueData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'leagues_and_teams.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSaveTeamJson = () => {
    if (!teamData) return
    
    const blob = new Blob([JSON.stringify(teamData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${teamData.id}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleValidationError = (errors: ValidationError[]) => {
    setValidationErrors(errors)
    setTimeout(() => setValidationErrors([]), 5000)
  }

  const handleCancel = () => {
    if (activeTab === 'leagues') {
      setLeagueData(null);
    } else {
      setTeamData(null);
    }
    setError(null);
    setValidationErrors([]);
  };

  const handleAddLeague = (newLeague: League) => {
    if (!leagueData) {
      setLeagueData({ leagues: [newLeague] });
    } else {
      setLeagueData({
        ...leagueData,
        leagues: [...leagueData.leagues, newLeague]
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
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
              <div className="flex justify-end gap-3">
                <AddLeagueButton onLeagueAdd={handleAddLeague} />
                <SaveJsonButton
                  data={leagueData.leagues}
                  onSave={handleSaveLeagueJson}
                  onCancel={handleCancel}
                  onValidationError={handleValidationError}
                />
              </div>
              <div className="space-y-4">
                {leagueData.leagues.map((league, index) => (
                  <CollapsibleLeagueCard
                    key={index}
                    league={league}
                    onUpdate={(updatedLeague) => handleLeagueUpdate(updatedLeague, index)}
                    onDelete={handleDeleteLeague}
                    defaultExpanded={index === 0} // Only expand the first league by default
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'teams' && teamData && (
            <div className="space-y-4">
              <div className="flex justify-end mb-4">
                <SaveTeamJsonButton
                  data={teamData}
                  onSave={handleSaveTeamJson}
                  onCancel={handleCancel}
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
      </main>
    </div>
  )
}

export default App
