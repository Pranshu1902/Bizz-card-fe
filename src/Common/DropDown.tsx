import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { navigate } from "raviger";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDown(props: { currentTab: string }) {
  const filters: any[] = [
    { title: "Home", active: true, icon: "fa fa-home", href: "/home" },
    { title: "Preview", active: false, icon: "fa fa-eye", href: "/preview" },
    { title: "Profile", active: false, icon: "fa fa-user", href: "/profile" },
  ];

  //   useEffect(() => {
  //     filters.forEach((filter) => {
  //       filter.title === props.currentTab
  //         ? (filter.active = true)
  //         : (filter.active = false);
  //     });
  //   }, [filters, props.currentTab]);

  return (
    <Menu as="div" className="relative w-3/4 inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-start w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {filters.filter((field: any) => field.active)[0].title}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {filters.map((filterElement: any, index) => (
              <Menu.Item key={index}>
                {() => (
                  <button
                    className={classNames(
                      filterElement.active
                        ? "bg-gray-100 hover:bg-gray-200 text-gray-900 w-full flex justify-start font-bold"
                        : "text-gray-700 bg-white hover:bg-gray-200 w-full flex justify-start hover:font-bold",
                      "px-4 py-2 text-sm flex items-center"
                    )}
                    onClick={() => {
                      navigate(filterElement.href);
                      let newFilter: any[] = [];
                      filters.forEach((element: any) => {
                        if (element.title === filterElement.title) {
                          newFilter.push({
                            title: element.title,
                            active: true,
                          });
                        } else {
                          newFilter.push({
                            title: element.title,
                            active: false,
                          });
                        }
                      });
                      // setFilter(newFilter);
                    }}
                  >
                    <i className={filterElement.icon}></i>&nbsp;
                    {filterElement.title}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
