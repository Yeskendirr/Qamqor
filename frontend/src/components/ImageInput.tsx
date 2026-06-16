import React, { useRef, useState } from 'react';

interface Props {
  currentUrl?: string | null;
  onFileSelect: (file: File | null) => void;
  onUrlChange: (url: string) => void;
}

export default function ImageInput({ currentUrl, onFileSelect, onUrlChange }: Props) {
  const [changing, setChanging] = useState(!currentUrl);
  const [mode, setMode] = useState<'url' | 'file'>('url');
  const [urlValue, setUrlValue] = useState('');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function startChange() {
    setChanging(true);
    setMode('url');
    setUrlValue('');
    setFilePreview(null);
    onFileSelect(null);
    onUrlChange(currentUrl ?? '');
  }

  function cancelChange() {
    setChanging(false);
    setUrlValue('');
    setFilePreview(null);
    onFileSelect(null);
    onUrlChange(currentUrl ?? '');
    if (fileRef.current) fileRef.current.value = '';
  }

  function handleUrlChange(val: string) {
    setUrlValue(val);
    onUrlChange(val);
    onFileSelect(null);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      onFileSelect(file);
      onUrlChange('');
      setFilePreview(URL.createObjectURL(file));
    } else {
      onFileSelect(null);
      setFilePreview(null);
    }
  }

  function switchMode(m: 'url' | 'file') {
    setMode(m);
    setUrlValue('');
    setFilePreview(null);
    onFileSelect(null);
    onUrlChange(currentUrl ?? '');
    if (fileRef.current) fileRef.current.value = '';
  }

  // Режим просмотра текущего фото
  if (!changing && currentUrl) {
    return (
      <div>
        <img
          src={currentUrl}
          alt="current"
          className="rounded-lg object-cover w-full mb-2"
          style={{ height: 140, objectFit: 'cover' }}
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
        <button
          type="button"
          onClick={startChange}
          className="text-xs px-3 py-1.5 rounded-md border transition-colors"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
        >
          Суретті өзгерту
        </button>
      </div>
    );
  }

  // Режим выбора нового фото
  const preview = mode === 'file' ? filePreview : (urlValue || null);

  return (
    <div>
      <div className="flex gap-1 mb-2">
        {(['url', 'file'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => switchMode(m)}
            className="px-3 py-1 text-xs rounded-md border transition-colors"
            style={mode === m
              ? { background: 'var(--color-green)', color: '#fff', borderColor: 'var(--color-green)' }
              : { borderColor: 'var(--color-border)', color: 'var(--color-muted)' }
            }
          >
            {m === 'url' ? 'Сілтеме (URL)' : 'Файл жүктеу'}
          </button>
        ))}
        {currentUrl && (
          <button
            type="button"
            onClick={cancelChange}
            className="px-3 py-1 text-xs rounded-md border ml-auto transition-colors"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
          >
            Бас тарту
          </button>
        )}
      </div>

      {mode === 'url' ? (
        <input
          className="field"
          type="text"
          placeholder="https://example.com/image.jpg"
          value={urlValue}
          onChange={(e) => handleUrlChange(e.target.value)}
        />
      ) : (
        <input
          ref={fileRef}
          className="field"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      )}

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="mt-2 rounded-lg w-full object-cover"
          style={{ height: 140, objectFit: 'cover' }}
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      )}
    </div>
  );
}
