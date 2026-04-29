import React, {
  useEffect,
  useState,
  startTransition,
  useMemo,
  useRef,
} from "react";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { NavStateType, Path, IUserType } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";
import { findCurrentRouteObjectByuseLocation } from "../../utils";
import { updateCurrentActivePathname } from "../../store/slices/navSlice";
import { clearNavStacks, addToNavStack } from "../../store/slices/navSlice";
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const NavContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const preLocation = useRef(location);
  const [activeKey, setActiveKey] = useState<string | undefined>();
  const { datas = {} } = useSelector((state: IUserType) => state.user);
  const { navStacks, currentActivePath } = useSelector(
    (state: { nav: NavStateType }) => state.nav,
  );
  const homeRouteList = (datas && datas.homeRouteList) || [];
  useEffect(() => {
    startTransition(() => {
      let navList: Array<{ label: string; key: string }> | [] = [];
      navStacks.map((nav: Path) => {
        navList = [
          ...navList!,
          {
            key: nav.path,
            label: nav.label,
          },
        ];
        setItems(navList);
      });
    });
  }, [navStacks]);
  useEffect(() => {
    console.log(currentActivePath.path);
    const path = currentActivePath.path.slice(1);
    setActiveKey(currentActivePath.path);
    // 此处可能会与menu的跳转重复，顾：replace: true
    navigate(path, { replace: true });
  }, [currentActivePath]);
  useEffect(() => {
    const fullPathName = location?.pathname ?? null;

    if (fullPathName) {
      const key = fullPathName.split("root")[1];
      const curPath = findCurrentRouteObjectByuseLocation(homeRouteList, key);
      if (!curPath.hidden) {
        const curIndex = navStacks.findIndex(
          (item) => item.path === curPath.url,
        );
        console.log("navStacks88888888888", navStacks, curPath, curIndex);
        if (curIndex < 0) {
          dispatch(
            addToNavStack({
              path: curPath.url,
              label: curPath.name,
            }),
          );
        }
        dispatch(
          updateCurrentActivePathname({
            path: curPath.url,
            label: curPath.name,
          }),
        );

        setActiveKey(key);
        preLocation.current = location;
      }
    }
  }, [location, dispatch, homeRouteList]);
  const [items, setItems] = useState<
    Array<{ label: string; key: string }> | undefined
  >();
  const onChange = (key: string) => {
    const path = key.slice(1);
    const curPath = findCurrentRouteObjectByuseLocation(homeRouteList, key);
    if (!curPath.hidden) {
      dispatch(
        updateCurrentActivePathname({ path: curPath.url, label: curPath.name }),
      );
    }
    navigate(path, { replace: false });
  };
  const onEdit = (targetPathUrl: TargetKey, action: "add" | "remove") => {
    if (action === "remove") {
      const curPath = findCurrentRouteObjectByuseLocation(
        homeRouteList,
        targetPathUrl as string,
      );
      dispatch(clearNavStacks({ path: curPath.url, label: curPath.name }));
    }
  };
  return (
    <>
      <Tabs
        tabBarStyle={{ marginBottom: "0px" }}
        hideAdd
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        type="editable-card"
        items={items}
      />
    </>
  );
};

export default NavContent;
