import { useState } from 'react'
import FileUpload from './components/FileUpload'
import LeagueCard from './components/LeagueCard'

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

interface JsonData {
  leagues: League[]
}

function App() {
  const [jsonData, setJsonData] = useState<JsonData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = (data: JsonData) => {
    setJsonData(data)
    setError(null)
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
    setJsonData(null)
  }

  const handleLeagueUpdate = (updatedLeague: League, index: number) => {
    if (!jsonData) return

    const newLeagues = [...jsonData.leagues]
    newLeagues[index] = updatedLeague
    setJsonData({
      ...jsonData,
      leagues: newLeagues,
    })
  }

  const handleSave = () => {
    if (!jsonData) return

    const dataStr = JSON.stringify(jsonData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'leagues_and_teams.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen w-full bg-secondary">
      <div className="sticky top-0 z-10 bg-primary shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-text-light">
              Backpack JSON Helper
            </h1>
            {jsonData && (
              <button
                onClick={handleSave}
                className="bg-text-light text-primary px-4 py-2 rounded-md hover:bg-white/90 transition-colors"
              >
                Save JSON
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!jsonData ? (
          <div className="mt-8">
            <FileUpload onFileUpload={handleFileUpload} onError={handleError} />
          </div>
        ) : (
          <div className="space-y-6">
            {jsonData.leagues.map((league, index) => (
              <LeagueCard
                key={league.id}
                league={league}
                onUpdate={(updatedLeague) =>
                  handleLeagueUpdate(updatedLeague, index)
                }
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
