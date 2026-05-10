package com.smarttv.app

import android.content.Intent
import android.os.Bundle
import android.view.KeyEvent
import android.view.View
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import android.graphics.Color
import android.widget.LinearLayout

class MainActivity : AppCompatActivity() {

    private lateinit var categoryRecycler: RecyclerView
    private lateinit var channelRecycler: RecyclerView
    private var selectedCategory = "Todos"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        categoryRecycler = findViewById(R.id.categoryRecycler)
        channelRecycler = findViewById(R.id.channelRecycler)

        setupCategories()
        setupChannels(selectedCategory)
    }

    private fun setupCategories() {
        val categories = ChannelRepository.getCategories()
        val layoutManager = LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)
        categoryRecycler.layoutManager = layoutManager
        categoryRecycler.adapter = CategoryAdapter(categories, selectedCategory) { category ->
            selectedCategory = category
            setupChannels(category)
        }
    }

    private fun setupChannels(category: String) {
        val channels = ChannelRepository.getByCategory(category)
        val columns = if (resources.displayMetrics.widthPixels >= 1920) 6 else 4
        channelRecycler.layoutManager = GridLayoutManager(this, columns)
        channelRecycler.adapter = ChannelAdapter(channels) { channel ->
            val intent = Intent(this, PlayerActivity::class.java)
            intent.putExtra("url", channel.url)
            intent.putExtra("name", channel.name)
            startActivity(intent)
        }
    }
}

// ─── Category Adapter ────────────────────────────────────────────────────────

class CategoryAdapter(
    private val categories: List<String>,
    private var selected: String,
    private val onClick: (String) -> Unit
) : RecyclerView.Adapter<CategoryAdapter.VH>() {

    inner class VH(val tv: TextView) : RecyclerView.ViewHolder(tv)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): VH {
        val tv = TextView(parent.context).apply {
            setPadding(40, 20, 40, 20)
            textSize = 16f
            isFocusable = true
            isFocusableInTouchMode = true
            setOnClickListener { onClick(text.toString()) }
            setOnFocusChangeListener { _, hasFocus ->
                scaleX = if (hasFocus) 1.1f else 1f
                scaleY = if (hasFocus) 1.1f else 1f
            }
        }
        return VH(tv)
    }

    override fun onBindViewHolder(holder: VH, position: Int) {
        val cat = categories[position]
        holder.tv.text = cat
        if (cat == selected) {
            holder.tv.setBackgroundColor(Color.parseColor("#E50914"))
            holder.tv.setTextColor(Color.WHITE)
        } else {
            holder.tv.setBackgroundColor(Color.parseColor("#2A2A2A"))
            holder.tv.setTextColor(Color.parseColor("#CCCCCC"))
        }
        holder.tv.setOnClickListener {
            selected = cat
            notifyDataSetChanged()
            onClick(cat)
        }
    }

    override fun getItemCount() = categories.size
}

// ─── Channel Adapter ─────────────────────────────────────────────────────────

class ChannelAdapter(
    private val channels: List<Channel>,
    private val onClick: (Channel) -> Unit
) : RecyclerView.Adapter<ChannelAdapter.VH>() {

    inner class VH(val container: LinearLayout) : RecyclerView.ViewHolder(container) {
        val nameText: TextView = container.getChildAt(0) as TextView
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): VH {
        val nameText = TextView(parent.context).apply {
            textSize = 15f
            setTextColor(Color.WHITE)
            gravity = android.view.Gravity.CENTER
            setPadding(8, 8, 8, 8)
        }

        val categoryText = TextView(parent.context).apply {
            textSize = 11f
            setTextColor(Color.parseColor("#AAAAAA"))
            gravity = android.view.Gravity.CENTER
        }

        val container = LinearLayout(parent.context).apply {
            orientation = LinearLayout.VERTICAL
            gravity = android.view.Gravity.CENTER
            setPadding(16, 24, 16, 24)
            setBackgroundColor(Color.parseColor("#1E1E1E"))
            isFocusable = true
            isFocusableInTouchMode = true

            val params = ViewGroup.MarginLayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
            ).apply { setMargins(8, 8, 8, 8) }
            layoutParams = params

            addView(nameText)
            addView(categoryText)

            setOnFocusChangeListener { view, hasFocus ->
                if (hasFocus) {
                    view.setBackgroundColor(Color.parseColor("#E50914"))
                    view.scaleX = 1.08f
                    view.scaleY = 1.08f
                    view.elevation = 12f
                } else {
                    view.setBackgroundColor(Color.parseColor("#1E1E1E"))
                    view.scaleX = 1f
                    view.scaleY = 1f
                    view.elevation = 0f
                }
            }
        }

        return VH(container)
    }

    override fun onBindViewHolder(holder: VH, position: Int) {
        val channel = channels[position]
        holder.nameText.text = channel.name
        (holder.container.getChildAt(1) as TextView).text = channel.category
        holder.container.setOnClickListener { onClick(channel) }
    }

    override fun getItemCount() = channels.size
}
