import { useMemo, useState } from 'react'

interface DownloadButtonsProps {
  gameSlug: string
}

const DL_PATHS = {
  win: '/assets/elderpath-crusade/ForestOfDreams-winX64.zip',
  linux: '/assets/elderpath-crusade/ForestOfDreams-linuxX64.zip',
  mac: '/assets/elderpath-crusade/ForestOfDreams-macX64.zip',
}

function detectOS(): 'win' | 'linux' | 'mac' | null {
  if (typeof window === 'undefined') return null
  
  const platform = navigator.platform.toLowerCase()
  const userAgent = navigator.userAgent.toLowerCase()
  
  // Check for Mac
  if (platform.includes('mac') || userAgent.includes('mac')) {
    return 'mac'
  }
  
  // Check for Windows
  if (platform.includes('win') || userAgent.includes('win')) {
    return 'win'
  }
  
  // Check for Linux
  if (platform.includes('linux') || userAgent.includes('linux')) {
    return 'linux'
  }
  
  // Default to null if we can't detect
  return null
}

export function DownloadButtons({ gameSlug: _gameSlug }: DownloadButtonsProps) {
  const detectedOS = useMemo(() => detectOS(), [])
  const [status, setStatus] = useState<{ msg: string; isError: boolean }>({
    msg: 'Note: Downloads may be large. If clicking does not start a download, right-click and choose "Save link as…" once links are available.',
    isError: false,
  })

  function triggerDownload(url: string) {
    const a = document.createElement('a')
    a.href = url
    try {
      a.download = ''
    } catch (_) {
      // Ignore
    }
    a.rel = 'noopener'
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    setTimeout(() => a.remove(), 1000)
  }

  function handleClick(platform: keyof typeof DL_PATHS) {
    const path = DL_PATHS[platform]
    if (!path) {
      setStatus({
        msg: 'Download path is not configured for this platform.',
        isError: true,
      })
      return
    }
    setStatus({ msg: 'Starting download…', isError: false })

    fetch(path, { method: 'HEAD' })
      .then((res) => {
        if (!res.ok) {
          throw new Error('File not found')
        }
        triggerDownload(path)
        setStatus({
          msg: 'If your download didn\'t start, try right-click → Save link as…',
          isError: false,
        })
      })
      .catch(() => {
        triggerDownload(path)
        setStatus({
          msg: 'Attempted to start the download. If it failed, the file may not be uploaded yet.',
          isError: true,
        })
      })
  }

  const getButtonClass = (platform: keyof typeof DL_PATHS) => {
    const isHighlighted = detectedOS === platform
    return `px-4 py-2 ${
      isHighlighted
        ? 'bg-emerald-500 hover:bg-emerald-600'
        : 'bg-slate-600 hover:bg-slate-700'
    } text-white font-semibold rounded-lg transition-colors`
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <button
          id="download-win"
          className={getButtonClass('win')}
          type="button"
          aria-label="Download Windows zip"
          onClick={() => handleClick('win')}
        >
          Download for Windows (zip)
        </button>
        <button
          id="download-linux"
          className={getButtonClass('linux')}
          type="button"
          aria-label="Download Linux zip"
          onClick={() => handleClick('linux')}
        >
          Download for Linux (zip)
        </button>
        <button
          id="download-mac"
          className={getButtonClass('mac')}
          type="button"
          aria-label="Download Mac zip"
          onClick={() => handleClick('mac')}
        >
          Download for Mac (zip)
        </button>
      </div>
      <p
        id="dl-msg"
        className={`text-sm mt-2 ${
          status.isError ? 'text-red-400' : 'text-gray-400'
        }`}
        role="status"
        aria-live="polite"
      >
        {status.msg}
      </p>
    </>
  )
}

