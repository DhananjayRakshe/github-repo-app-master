import React from "react"
import { format } from "date-fns"

export default function Profile(ItemData, searchString) {

  

  return (
    <article className="transform  bg-slate-700 p-5 rounded text-zinc-300 shadow shadow-slate-300 hover:drop-shadow-2xl hover:scale-105 transition duration-500">
      <div className="flex items-center">
        <img
          src={ItemData.owner.avatar_url}
          alt={ItemData.owner.login}
          className="w-16 h-16 shadow rounded-full"
        />
        <ul className="ml-5">
          <li>
            <h2 className="font-bold text-xl">{ItemData.owner.login}</h2>
          </li>
          <div>
            <p className="mr-2">{ItemData.name}</p>
            {ItemData.private ? (
              <p className="bg-rose-700 py-1 px-2 rounded-lg shadow text-zinc-300 text-xs inline-block opacity-75">
                Private
              </p>
            ) : (
              <p className="shadow-slate-400 py-1 px-2 rounded-lg shadow text-zinc-300 text-xs inline-block opacity-75 mr-2">
                Public
              </p>
            )}
          </div>
        </ul>
      </div>

      <div>
        <p className="mt-5 text-sm">
          This repository was created on{" "}
          {format(new Date(ItemData.created_at), "dd MMMM yyyy")} by{" "}
          {ItemData.owner.login}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between text-right">
        <a
          className="underline text-sm"
          href={ItemData.html_url}
          target="_blank"
          rel="noreferrer"
        >
          View Repo
        </a>
        <ul>
          <li>{ItemData.stargazers_count.toLocaleString()} stars</li>
          <li>{ItemData.watchers_count.toLocaleString()} Watchers</li>
        </ul>
      </div>

      <div className="flex items-center justify-between flex-wrap mt-5">
        <ul className="text-xs flex items-center justify-start">
          <li className="py-1 px-2 text-white bg-emerald-700 opacity-75 rounded-lg shadow inline-block mr-2">
            {ItemData.language}
          </li>

          {ItemData.topics &&
            ItemData.topics.map((topic, index) => (
              <React.Fragment key={index}>
                <li className="py-1 px-2 text-white bg-emerald-700 opacity-75 rounded-lg shadow inline-block mr-2">
                  {topic}
                </li>
              </React.Fragment>
            ))}
        </ul>

        <p>{ItemData.open_issues} issues</p>
      </div>
    </article>
  )
}
