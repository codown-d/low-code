import { jsonFile } from '@/services';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import { AssetLoader, buildComponents } from '@alilc/lowcode-utils';
import { useLocation } from '@umijs/max';
import { isArray, mergeWith } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import appHelper from './appHelper';
import {
  getPackagesFromLocalStorage,
  getPreviewLocale,
  setPreviewLocale,
} from './services/mockService';

const getScenarioName = function () {
  if (location.search) {
    return (
      new URLSearchParams(location.search.slice(1)).get('scenarioName') ||
      'general'
    );
  }
  return 'general';
};

const SamplePreview = () => {
  const [data, setData] = useState({});
  const scenarioName = getScenarioName();
  const packages = getPackagesFromLocalStorage(scenarioName);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let init = useCallback(async () => {
    const response = await jsonFile({
      fileName: queryParams.get('fileName') as string,
    });
    const {
      componentsMap: componentsMapArray,
      componentsTree,
      i18n,
      dataSource: projectDataSource,
    } = response.data;
    const componentsMap: any = {};
    componentsMapArray.forEach((component: any) => {
      componentsMap[component.componentName] = component;
    });
    const pageSchema = componentsTree[0];

    const libraryMap: any = {};
    const libraryAsset: any[] = [];
    packages.forEach(({ package: _package, library, urls, renderUrls }) => {
      libraryMap[_package] = library;
      if (renderUrls) {
        libraryAsset.push(renderUrls);
      } else if (urls) {
        libraryAsset.push(urls);
      }
    });

    const assetLoader = new AssetLoader();
    await assetLoader.load(libraryAsset);
    const components = buildComponents(libraryMap, componentsMap);
    setData({
      schema: pageSchema,
      components,
      i18n,
      projectDataSource,
    });
  }, [location]);
  useEffect(() => {
    init();
  }, [init]);

  const currentLocale = getPreviewLocale(getScenarioName());
  if (!(window as any).setPreviewLocale) {
    // for demo use only, can use this in console to switch language for i18n test
    // 在控制台 window.setPreviewLocale('en-US') 或 window.setPreviewLocale('zh-CN') 查看切换效果
    (window as any).setPreviewLocale = (locale: string) =>
      setPreviewLocale(getScenarioName(), locale);
  }

  function customizer(objValue: [], srcValue: []) {
    if (isArray(objValue)) {
      return objValue.concat(srcValue || []);
    }
  }
  const { schema, components, i18n = {}, projectDataSource = {} } = data as any;

  if (!schema || !components) {
    return <></>;
  }
  return (
    <div
      className="lowcode-plugin-sample-preview"
      style={{
        overflow: 'auto',
        height: '100vh',
      }}
    >
      <ReactRenderer
        className="lowcode-plugin-sample-preview-content"
        schema={{
          ...schema,
          dataSource: mergeWith(
            schema.dataSource,
            projectDataSource,
            customizer,
          ),
        }}
        components={components}
        locale={currentLocale}
        messages={i18n}
        appHelper={appHelper}
      />
    </div>
  );
};

export default SamplePreview;
