import { useState, useEffect, useCallback } from 'react';
import Dexie, { Table } from 'dexie';

interface SettingsRecord {
  key: string;
  value: any;
}

interface DocumentRecord {
  id: string;
  content: string;
  updatedAt?: Date;
}

class MarkdownPlaygroundDB extends Dexie {
  settings!: Table<SettingsRecord>;
  documents!: Table<DocumentRecord>;

  constructor() {
    super('MarkdownPlayground');
    this.version(1).stores({
      settings: '&key, value',
      documents: '&id, content, updatedAt'
    });
  }
}

const db = new MarkdownPlaygroundDB();

export const useIndexedDB = () => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    db.open()
      .then(() => {
        setIsReady(true);
        setError(null);
      })
      .catch((err) => {
        console.error('Failed to open database:', err);
        setError(err.message);
      });
  }, []);

  // Settings işlemleri
  const saveSetting = useCallback(async (key: string, value: any) => {
    try {
      await db.settings.put({ key, value });
    } catch (err) {
      console.error('Failed to save setting:', err);
      throw err;
    }
  }, []);

  const getSetting = useCallback(async (key: string, defaultValue?: any) => {
    try {
      const record = await db.settings.get(key);
      return record ? record.value : defaultValue;
    } catch (err) {
      console.error('Failed to get setting:', err);
      return defaultValue;
    }
  }, []);

  // Document işlemleri

  // Son markdown'ı kaydet
const saveDocument = useCallback(async (content: string) => {
  if (!content.trim()) {
    console.log('Boş içerik kaydedilmedi.');
    return;
  }
  try {
    console.log('saveDocument çağrıldı:', content);
    await db.documents.put({ id: 'latest', content, updatedAt: new Date() });
  } catch (err) {
    console.error('Failed to save document:', err);
    throw err;
  }
}, []);

  // Son markdown'ı getir
  const getDocument = useCallback(async (): Promise<string> => {
  try {
    const doc = await db.documents.get('latest');
    console.log('getDocument çağrıldı, dönen:', doc);
    return doc?.content ?? '';
  } catch (err) {
    console.error('Failed to get document:', err);
    return '';
  }
}, []);
  const testDB = useCallback(async () => {
  try {
    console.log('--- DB Test Başlıyor ---');
    await saveDocument('# Test markdown içeriği');
    const doc = await getDocument();
    console.log('DB’den okunan test doküman:', doc);
    console.log('--- DB Test Bitti ---');
  } catch (e) {
    console.error('DB testinde hata:', e);
  }
}, [saveDocument, getDocument]);

return {
  isReady,
  error,
  saveSetting,
  getSetting,
  saveDocument,
  getDocument,
  testDB,  // BURAYA EKLENDİ
};
};

export default useIndexedDB;
